from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from datetime import date
from schemas import CitizenCreator
from database import get_db
from .dependencies import get_current_user
from utils import get_password_hash

router = APIRouter(prefix="/citizen-creator", tags=["Citizens"])


@router.post("/", response_model=dict)
def create_citizen(
    citizen: CitizenCreator,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Only allow pradhan or employee to create citizen records
    if user["role"] not in {"pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create citizens",
        )

    try:
        hashed_pw = get_password_hash(citizen.password)
        sql_insert = text(
            """
            INSERT INTO citizens 
            (name, gender, dob, educational_qualification, income, household_id, email, hashed_password)
            VALUES (:name, :gender, :dob, :educational_qualification, :income, :household_id, :email, :hashed_password)
            RETURNING citizen_id, name, gender, dob, educational_qualification, income, email, household_id
        """
        )
        params = {
            "name": citizen.name,
            "gender": citizen.gender,
            "dob": citizen.dob,
            "educational_qualification": citizen.educational_qualification,
            "income": citizen.income,
            "household_id": citizen.household_id,
            "hashed_password": hashed_pw,
            "email": "tmp@panchayat.com",
        }
        result = db.execute(sql_insert, params)
        new_citizen = result.fetchone()
        if not new_citizen:
            raise HTTPException(
                status_code=500, detail="Failed to create citizen record"
            )
        new_citizen_id = new_citizen.citizen_id

        # Update email with generated value
        generated_email = f"{new_citizen_id}@panchayat.com"
        sql_update = text(
            "UPDATE citizens SET email = :email WHERE citizen_id = :citizen_id"
        )
        db.execute(sql_update, {"email": generated_email, "citizen_id": new_citizen_id})

        # If income > 0, add a tax record
        if citizen.income and citizen.income > 30000:
            current_date = date(date.today().year, 12, 31)
            sql_tax = text(
                """
                INSERT INTO taxes (type, amount, payment_status, citizen_id, date)
                VALUES ('Income Tax', :tax_amount, 'Pending', :citizen_id, :tax_date)
            """
            )
            tax_amount = citizen.income * 4
            db.execute(
                sql_tax,
                {
                    "tax_amount": tax_amount,
                    "citizen_id": new_citizen_id,
                    "tax_date": current_date,
                },
            )

        db.commit()

        return {
            "citizen_id": new_citizen_id,
            "name": new_citizen.name,
            "gender": new_citizen.gender,
            "dob": new_citizen.dob.isoformat(),
            "educational_qualification": new_citizen.educational_qualification,
            "income": (
                float(new_citizen.income) if new_citizen.income is not None else 0.0
            ),
            "household_id": new_citizen.household_id,
            "email": generated_email,
            "message": "Citizen created successfully",
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )
