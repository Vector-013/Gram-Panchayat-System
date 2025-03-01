from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from database import get_db
from .dependencies import get_current_user
from pydantic import BaseModel
from decimal import Decimal
from .integrity import HouseholdCreate, LandRecordCreate

router = APIRouter()


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


@router.post("/land-records/", response_model=dict)
def create_land_record(
    land_data: LandRecordCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    # Only employees or pradhan can create land records
    if user["role"] not in ["employee", "pradhan"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Insert into land_records table

    try:
        sql = text(
            """
            INSERT INTO land_records (area_acres, weight, crop_type, year_recorded, citizen_id)
            VALUES (:area_acres, :weight, :crop_type, :year_recorded, :citizen_id)
            RETURNING land_id
        """
        )
        result = db.execute(
            sql,
            {
                "area_acres": land_data.area_acres,
                "weight": land_data.weight,
                "crop_type": land_data.crop_type,
                "year_recorded": land_data.year_recorded,
                "citizen_id": land_data.citizen_id,
            },
        ).fetchone()
        db.commit()

        land_id = result.land_id

        if result:

            return {"message": "Land record added successfully", "land_id": land_id}

        else:
            raise HTTPException(status_code=500, detail="Land record creation failed")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
