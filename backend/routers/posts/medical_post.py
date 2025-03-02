from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date
from database import get_db
from pydantic import BaseModel, Field
from routers.posts.dependencies import get_current_user

VALID_MEDICAL_CONDITIONS = {
    "Hypertension",
    "Healthy",
    "Low Blood Pressure",
    "Diabetes",
    "Arthritis",
    "Asthma",
    "Allergies",
    "Kidney Disease",
    "Liver Disease",
}
VALID_HEALTH_STATUSES = {"Good", "Critical", "Poor", "Fair", "Excellent"}


class MedicalDataInsert(BaseModel):
    citizen_id: int = Field(..., description="ID of the citizen")
    health_status: str = Field(
        ..., description="Health status, e.g. 'Good', 'Poor', etc."
    )
    medical_condition: str = Field(
        ..., description="Medical condition, e.g. 'Diabetes' or 'None'"
    )


class FloraFaunaUpdate(BaseModel):
    f_id: int = Field(..., description="ID of the flora/fauna record")
    habitat: str = Field(..., description="New habitat")
    count: int = Field(..., description="New count")


router = APIRouter(prefix="", tags=["Medical Data"])


@router.post("/medical-data-insert", response_model=dict)
def insert_medical_data(
    data: MedicalDataInsert,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view medical data",
        )

    medical_condition = data.medical_condition
    health_status = data.health_status

    if medical_condition not in VALID_MEDICAL_CONDITIONS:
        raise HTTPException(status_code=400, detail="Invalid medical condition")

    if health_status not in VALID_HEALTH_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid health status")

    if (
        medical_condition == "Healthy"
        and health_status
        and health_status != "Excellent"
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'None', health status must be 'Excellent'",
        )
    if (
        health_status
        and health_status != "Good"
        and (medical_condition == "Asthma" or medical_condition == "Allergies")
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Ashtma' or 'Allegries', health status must be 'Good'",
        )

    if (
        health_status
        and health_status != "Fair"
        and (
            medical_condition == "Low Blood Pressure"
            or medical_condition == "Hypertension"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Low Blood Pressure' or 'Hypertension', health status must be 'Fair'",
        )

    if (
        health_status
        and health_status != "Poor"
        and (medical_condition == "Diabetes" or medical_condition == "Arthritis")
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Diabetes' or 'Arthritis', health status must be 'Poor'",
        )

    if (
        health_status
        and health_status != "Critical"
        and (
            medical_condition == "Kidney Disease"
            or medical_condition == "Liver Disease"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Kidney Disease' or 'Liver Disease', health status must be 'Critical'",
        )

    today = date.today()
    sql = text(
        """
        INSERT INTO medical_data (citizen_id, health_status, medical_condition, date_recorded)
        VALUES (:citizen_id, :health_status, :medical_condition, :date_recorded)
        RETURNING medical_id, citizen_id, health_status, medical_condition, to_char(date_recorded, 'YYYY-MM-DD') AS date_recorded
    """
    )
    params = {
        "citizen_id": data.citizen_id,
        "health_status": data.health_status,
        "medical_condition": data.medical_condition,
        "date_recorded": today,
    }
    try:
        result = db.execute(sql, params)
        db.commit()
        inserted = result.fetchone()
        return dict(inserted._mapping)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/update-flora-fauna", response_model=dict)
def update_flora_fauna(
    data: FloraFaunaUpdate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=403, detail="Not authorized to view medical data"
        )

    sql = text(
        """
        UPDATE flora_fauna
        SET habitat = :habitat,
            count = :count
        WHERE f_id = :f_id
        RETURNING f_id, type, name, habitat, count;
    """
    )
    params = {
        "f_id": data.f_id,
        "habitat": data.habitat,
        "count": data.count,
    }
    try:
        result = db.execute(sql, params)
        db.commit()
        updated = result.fetchone()
        if not updated:
            raise HTTPException(status_code=404, detail="Record not found")
        return dict(updated._mapping)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
