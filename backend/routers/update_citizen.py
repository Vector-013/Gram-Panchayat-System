from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date
from passlib.context import CryptContext
from database import get_db
from routers.posts.dependencies import get_current_user
from schemas.citizens import CitizenUpdate

router = APIRouter(prefix="/update-citizen", tags=["Citizen Update"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.get("/get/{citizen_id}", response_model=dict)
def get_citizen_details(
    citizen_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can fetch citizen details",
        )

    sql = text(
        """
        SELECT citizen_id, name, gender, dob, educational_qualification, income, household_id, email
        FROM citizens WHERE citizen_id = :citizen_id;
    """
    )
    citizen = db.execute(sql, {"citizen_id": citizen_id}).fetchone()

    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
    else:
        citizen = citizen._mapping

    # return dict(citizen)
    dict_citizen = {
        "citizen_id": citizen["citizen_id"],
        "name": citizen["name"],
        "gender": citizen["gender"],
        "dob": citizen["dob"],
        "educational_qualification": citizen["educational_qualification"],
        "income": citizen["income"],
        "household_id": citizen["household_id"],
        "email": citizen["email"],
    }
    return dict_citizen


@router.post("/post", response_model=dict)
def update_citizen_details(
    citizen_data: CitizenUpdate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    if user["role"] not in {"admin", "pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update citizen details",
        )

    sql_get = text("SELECT * FROM citizens WHERE citizen_id = :citizen_id;")
    existing_citizen = db.execute(
        sql_get, {"citizen_id": citizen_data.citizen_id}
    ).fetchone()

    if not existing_citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
    else:
        existing_citizen = existing_citizen._mapping

    update_fields = {}
    if (
        citizen_data.educational_qualification
        != existing_citizen["educational_qualification"]
    ):
        update_fields["educational_qualification"] = (
            citizen_data.educational_qualification
        )
    if citizen_data.household_id != existing_citizen["household_id"]:
        update_fields["household_id"] = citizen_data.household_id
    if citizen_data.password:
        update_fields["hashed_password"] = pwd_context.hash(citizen_data.password)

    # Update the tax if income changes
    if existing_citizen["income"] != citizen_data.income:
        update_income_tax(db, citizen_data.citizen_id, citizen_data.income)
        update_fields["income"] = citizen_data.income

    if update_fields:
        update_query = text(
            f"""
            UPDATE citizens SET {", ".join(f"{key} = :{key}" for key in update_fields.keys())}
            WHERE citizen_id = :citizen_id;
        """
        )
        update_fields["citizen_id"] = citizen_data.citizen_id
        db.execute(update_query, update_fields)
        db.commit()

    return {"status": "Citizen updated successfully"}


def update_income_tax(db: Session, citizen_id: int, new_income: float):
    """Updates or inserts income tax for the given citizen."""
    current_year = date.today().year
    tax_query = text(
        """
        SELECT tax_id FROM taxes 
        WHERE citizen_id = :citizen_id AND type = 'Income Tax' AND date_part('year', date) = :current_year;
    """
    )
    existing_tax = db.execute(
        tax_query, {"citizen_id": citizen_id, "current_year": current_year}
    ).fetchone()

    if existing_tax:
        update_tax = text(
            """
            UPDATE taxes SET amount = :new_amount WHERE tax_id = :tax_id;
        """
        )
        db.execute(
            update_tax, {"new_amount": new_income * 4, "tax_id": existing_tax.tax_id}
        )
    else:
        insert_tax = text(
            """
            INSERT INTO taxes (type, amount, payment_status, citizen_id, date)
            VALUES ('Income Tax', :new_amount, 'Pending', :citizen_id, :tax_date);
        """
        )
        db.execute(
            insert_tax,
            {
                "new_amount": new_income * 4,
                "citizen_id": citizen_id,
                "tax_date": date.today(),
            },
        )

    db.commit()
