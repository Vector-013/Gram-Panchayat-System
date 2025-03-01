from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from database import get_db
from .dependencies import get_current_user
from pydantic import BaseModel

router = APIRouter()


class HouseholdCreate(BaseModel):
    address: str


@router.post("/households/", response_model=dict)
def create_household(
    household: HouseholdCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Ensure only employees or pradhan can create households
    if user["role"] not in {"employee", "pradhan"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a household",
        )

    try:
        sql = text(
            """
            INSERT INTO households (address)
            VALUES (:address)
            RETURNING household_id, address
        """
        )
        result = db.execute(sql, {"address": household.address}).fetchone()
        db.commit()

        if result:
            return {"household_id": result.household_id, "address": result.address}
        else:
            raise HTTPException(status_code=500, detail="Household creation failed")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
