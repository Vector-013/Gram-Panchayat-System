import random
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date
from database import get_db
from routers.posts.dependencies import get_current_user
from pydantic import BaseModel, Field
from datetime import date


class MarriageCreate(BaseModel):
    husband_id: int = Field(..., description="Husband's citizen ID")
    wife_id: int = Field(..., description="Wife's citizen ID")
    marriage_date: date = Field(..., description="Marriage date (YYYY-MM-DD)")


router = APIRouter(prefix="/marriage", tags=["Marriage"])


@router.post("/", response_model=dict)
def create_marriage(
    marriage: MarriageCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to create marriage records",
        )

    # Step 1: Check if either partner is already married.
    sql_check = text(
        """
        SELECT citizen_id FROM (
            SELECT husband_id AS citizen_id FROM marriage
            UNION
            SELECT wife_id AS citizen_id FROM marriage
        ) m
        WHERE citizen_id IN (:husband_id, :wife_id)
    """
    )
    existing = db.execute(
        sql_check, {"husband_id": marriage.husband_id, "wife_id": marriage.wife_id}
    ).fetchall()

    if existing:
        already_married = [str(row[0]) for row in existing]
        error_msg = ", ".join([f"{cid} is already married" for cid in already_married])
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error_msg)

    # Step 2: Insert new marriage record.
    sql_insert = text(
        """
        INSERT INTO marriage (husband_id, wife_id, marriage_date)
        VALUES (:husband_id, :wife_id, :marriage_date)
    """
    )
    db.execute(
        sql_insert,
        {
            "husband_id": marriage.husband_id,
            "wife_id": marriage.wife_id,
            "marriage_date": marriage.marriage_date,
        },
    )

    # Step 3: Randomly update household_id:
    # 50% chance: update husband's household_id to match wife's.
    # Otherwise: update wife's household_id to match husband's.
    if random.choice([0, 1]) == 0:
        sql_update = text(
            """
            UPDATE citizens
            SET household_id = (SELECT household_id FROM citizens WHERE citizen_id = :wife_id)
            WHERE citizen_id = :husband_id
        """
        )
        db.execute(
            sql_update, {"wife_id": marriage.wife_id, "husband_id": marriage.husband_id}
        )
    else:
        sql_update = text(
            """
            UPDATE citizens
            SET household_id = (SELECT household_id FROM citizens WHERE citizen_id = :husband_id)
            WHERE citizen_id = :wife_id
        """
        )
        db.execute(
            sql_update, {"husband_id": marriage.husband_id, "wife_id": marriage.wife_id}
        )

    try:
        db.commit()
        return {"message": "Marriage record created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
