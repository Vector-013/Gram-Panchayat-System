from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db
from routers.posts.dependencies import get_current_user
from pydantic import BaseModel, Field
from datetime import date as dt

router = APIRouter(prefix="/death-event", tags=["Death Event"])


class DeathEvent(BaseModel):
    citizen_id: int = Field(..., description="ID of the deceased citizen")
    date: dt = Field(
        ...,
        description="Date of death (YYYY-MM-DD). If omitted, today's date will be used.",
    )
    cause: str = Field(..., description="Cause of death")


def calculate_inheritance(db: Session, deceased_id: int) -> str:
    """Handles land record inheritance logic and returns a descriptive message."""
    transferred = False
    inheritance_message = "No inheritance transfer occurred."

    # Check if the deceased has any land records.
    sql_check_land = text(
        "SELECT COUNT(*) FROM land_records WHERE citizen_id = :citizen_id"
    )
    land_count = db.execute(sql_check_land, {"citizen_id": deceased_id}).scalar()

    if land_count and land_count > 0:
        # 1. Check for spouse
        sql_spouse = text(
            """
            SELECT CASE 
                WHEN husband_id = :deceased_id THEN wife_id 
                WHEN wife_id = :deceased_id THEN husband_id 
            END AS spouse_id
            FROM marriage
            WHERE :deceased_id IN (husband_id, wife_id)
        """
        )
        spouse_row = db.execute(sql_spouse, {"deceased_id": deceased_id}).fetchone()
        spouse_id = spouse_row.spouse_id if spouse_row else None

        if spouse_id:
            # Check if spouse is alive (not in deaths)
            sql_check_spouse = text(
                "SELECT 1 FROM deaths WHERE citizen_id = :spouse_id"
            )
            spouse_dead = db.execute(
                sql_check_spouse, {"spouse_id": spouse_id}
            ).scalar()
            if not spouse_dead:
                sql_transfer = text(
                    "UPDATE land_records SET citizen_id = :spouse_id WHERE citizen_id = :deceased_id"
                )
                db.execute(
                    sql_transfer, {"spouse_id": spouse_id, "deceased_id": deceased_id}
                )
                transferred = True
                inheritance_message = (
                    f"Land records transferred to spouse (ID: {spouse_id})."
                )

        # 2. If no alive spouse, check for children.
        if not transferred:
            sql_children = text(
                """
                SELECT child_id FROM births 
                WHERE father_id = :deceased_id OR mother_id = :deceased_id
                LIMIT 1
            """
            )
            child_row = db.execute(
                sql_children, {"deceased_id": deceased_id}
            ).fetchone()
            if child_row:
                child_id = child_row.child_id
                sql_transfer = text(
                    "UPDATE land_records SET citizen_id = :child_id WHERE citizen_id = :deceased_id"
                )
                db.execute(
                    sql_transfer, {"child_id": child_id, "deceased_id": deceased_id}
                )
                transferred = True
                inheritance_message = (
                    f"Land records transferred to child (ID: {child_id})."
                )

        # 3. If no spouse or children, check for any other citizen in the same household.
        if not transferred:
            sql_household = text(
                "SELECT household_id FROM citizens WHERE citizen_id = :deceased_id"
            )
            household_row = db.execute(
                sql_household, {"deceased_id": deceased_id}
            ).fetchone()
            if household_row:
                household_id = household_row.household_id
                sql_other = text(
                    """
                    SELECT citizen_id FROM citizens 
                    WHERE household_id = :household_id AND citizen_id != :deceased_id
                    LIMIT 1
                """
                )
                other_row = db.execute(
                    sql_other,
                    {"household_id": household_id, "deceased_id": deceased_id},
                ).fetchone()
                if other_row:
                    other_citizen_id = other_row.citizen_id
                    sql_transfer = text(
                        "UPDATE land_records SET citizen_id = :other_citizen_id WHERE citizen_id = :deceased_id"
                    )
                    db.execute(
                        sql_transfer,
                        {
                            "other_citizen_id": other_citizen_id,
                            "deceased_id": deceased_id,
                        },
                    )
                    transferred = True
                    inheritance_message = f"Land records transferred to household member (ID: {other_citizen_id})."

        # 4. If no eligible heir found, delete the land records.
        if not transferred:
            sql_delete_land = text(
                "DELETE FROM land_records WHERE citizen_id = :deceased_id"
            )
            db.execute(sql_delete_land, {"deceased_id": deceased_id})
            inheritance_message = "No eligible heir found; land records deleted."
    else:
        inheritance_message = "No land records found for the deceased."

    return inheritance_message


@router.post("/", response_model=dict)
def process_death_event(
    death_event: DeathEvent,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=403, detail="Not authorized to process death events."
        )
    
    death_date = death_event.date or dt.today()
    deceased_id = death_event.citizen_id
    messages = []

    try:
        # 1. Insert the death record.
        sql_insert_death = text(
            """
            INSERT INTO deaths (citizen_id, date, cause)
            VALUES (:citizen_id, :date, :cause)
        """
        )
        db.execute(
            sql_insert_death,
            {"citizen_id": deceased_id, "date": death_date, "cause": death_event.cause},
        )
        messages.append("Death record inserted.")

        # 2. Process land records.
        inheritance_message = calculate_inheritance(db, deceased_id)
        messages.append(inheritance_message)

        # 3. Delete tax entries for the deceased.
        sql_delete_tax = text("DELETE FROM taxes WHERE citizen_id = :citizen_id")
        db.execute(sql_delete_tax, {"citizen_id": deceased_id})
        messages.append("Tax entries deleted.")

        # 4. Remove employee record if exists.
        sql_delete_employee = text(
            "DELETE FROM panchayat_employees WHERE citizen_id = :citizen_id"
        )
        result_emp = db.execute(sql_delete_employee, {"citizen_id": deceased_id})
        if result_emp.rowcount and result_emp.rowcount > 0:
            messages.append("Employee record deleted.")
        else:
            messages.append("No employee record found.")

        db.commit()
        return {"message": "Death event processed successfully.", "details": messages}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
