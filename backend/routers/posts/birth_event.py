from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date
from schemas.birth_event import BirthEvent
from database import get_db
from .dependencies import (
    get_current_user,
)
from utils import get_password_hash

router = APIRouter(prefix="/birth-event", tags=["Birth Events"])


@router.post("/", response_model=dict)
def birth_event(
    birth: BirthEvent,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    today = date.today()

    # Only users with role 'pradhan' or 'employee' can create PanchayatEmployee records.
    if current_user["role"] not in {"pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a Panchayat Employee record.",
        )
    try:
        # Get mother's household_id
        sql_mother = text(
            "SELECT household_id FROM citizens WHERE citizen_id = :mother_id"
        )
        mother_data = db.execute(sql_mother, {"mother_id": birth.mother_id}).fetchone()
        if not mother_data:
            raise HTTPException(status_code=404, detail="Mother not found")
        household_id = mother_data.household_id

        # Insert new citizen for the baby
        hashed_pw = get_password_hash(birth.password)
        sql_insert = text(
            """
            INSERT INTO citizens 
            (name, gender, dob, educational_qualification, income, household_id, hashed_password)
            VALUES (:name, :gender, :dob, 'Illiterate', 0, :household_id, :hashed_password)
            RETURNING citizen_id, name, gender, dob, household_id
        """
        )
        params = {
            "name": birth.baby_name,
            "gender": birth.gender,
            "dob": today,
            "household_id": household_id,
            "hashed_password": hashed_pw,
        }
        result = db.execute(sql_insert, params)
        new_citizen = result.fetchone()
        if not new_citizen:
            raise HTTPException(status_code=500, detail="Failed to create baby record")
        new_citizen_id = new_citizen.citizen_id

        # Update email to {citizen_id}@panchayat.com
        generated_email = f"{new_citizen_id}@panchayat.com"
        sql_update = text(
            "UPDATE citizens SET email = :email WHERE citizen_id = :citizen_id"
        )
        db.execute(sql_update, {"email": generated_email, "citizen_id": new_citizen_id})

        # Insert birth event record
        sql_birth = text(
            """
            INSERT INTO births (child_id, father_id, mother_id, birth_date)
            VALUES (:child_id, :father_id, :mother_id, :birth_date)
        """
        )
        db.execute(
            sql_birth,
            {
                "child_id": new_citizen_id,
                "father_id": birth.father_id,
                "mother_id": birth.mother_id,
                "birth_date": today,
            },
        )
        db.commit()
        return {
            "citizen_id": new_citizen_id,
            "name": new_citizen.name,
            "gender": new_citizen.gender,
            "dob": new_citizen.dob.isoformat(),
            "household_id": new_citizen.household_id,
            "email": generated_email,
            "message": "Birth event processed successfully",
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
