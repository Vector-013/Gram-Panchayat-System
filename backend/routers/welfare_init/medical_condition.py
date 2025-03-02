from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, conint, confloat
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db
from routers.posts.dependencies import get_current_user
from decimal import Decimal
from typing import Union


router = APIRouter(prefix="/welfare/medical-data", tags=["Welfare - Medical Data"])

# Allowed values for medical condition & health status
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


# Request body model
class MedicalDataFilter(BaseModel):
    min_age: Union[int, None] = None
    max_age: Union[int, None] = None
    min_income: Union[Decimal, None] = None
    max_income: Union[Decimal, None] = None
    medical_condition: str | None = None
    health_status: str | None = None


@router.post("/")
def get_medical_data(
    filters: MedicalDataFilter,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),  # Authentication required
):

    if user["role"] not in {"pradhan", "employee", "admin", "welfare"}:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view medical data",
        )

    # Integrity checks
    if (
        filters.medical_condition
        and filters.medical_condition not in VALID_MEDICAL_CONDITIONS
    ):
        raise HTTPException(status_code=400, detail="Invalid medical condition")

    if filters.health_status and filters.health_status not in VALID_HEALTH_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid health status")

    if (
        filters.medical_condition == "Healthy"
        and filters.health_status
        and filters.health_status != "Excellent"
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'None', health status must be 'Excellent'",
        )
    if (
        filters.health_status
        and filters.health_status != "Good"
        and (
            filters.medical_condition != "Asthma"
            or filters.medical_condition != "Allergies"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Ashtma' or 'Allegries', health status must be 'Good'",
        )

    if (
        filters.health_status
        and filters.health_status != "Fair"
        and (
            filters.medical_condition != "Low Blood Pressure"
            or filters.medical_condition != "Hypertension"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Low Blood Pressure' or 'Hypertension', health status must be 'Fair'",
        )

    if (
        filters.health_status
        and filters.health_status != "Poor"
        and (
            filters.medical_condition != "Diabetes"
            or filters.medical_condition != "Arthritis"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Diabetes' or 'Arthritis', health status must be 'Poor'",
        )

    if (
        filters.health_status
        and filters.health_status != "Critical"
        and (
            filters.medical_condition != "Kidney Disease"
            or filters.medical_condition != "Liver Disease"
        )
    ):
        raise HTTPException(
            status_code=400,
            detail="If medical condition is 'Kidney Disease' or 'Liver Disease', health status must be 'Critical'",
        )

    # Set default bounds
    min_age = filters.min_age if filters.min_age is not None else 0
    max_age = (
        filters.max_age if filters.max_age is not None else 200
    )  # Assume high upper bound

    min_income = filters.min_income if filters.min_income is not None else 0
    max_income = filters.max_income if filters.max_income is not None else float("inf")

    # Query: Group households and calculate total household income
    sql = text(
        f"""
        WITH household_income AS (
            SELECT 
                h.household_id, 
                COALESCE(SUM(c.income), 0) AS total_income
            FROM citizens c
            JOIN households h ON c.household_id = h.household_id
            GROUP BY h.household_id
        )
        SELECT 
            c.citizen_id, 
            c.name, 
            EXTRACT(YEAR FROM AGE(c.dob))::int AS age,
            c.household_id, 
            h.address, 
            MAX(m.medical_condition) AS medical_condition,
            MAX(m.health_status) AS health_status
        FROM citizens c
        JOIN household_income hi ON c.household_id = hi.household_id
        JOIN households h ON c.household_id = h.household_id
        JOIN medical_data m ON c.citizen_id = m.citizen_id
        WHERE 
            EXTRACT(YEAR FROM AGE(c.dob)) BETWEEN :min_age AND :max_age
            AND hi.total_income BETWEEN :min_income AND :max_income
            {"AND m.medical_condition = :medical_condition" if filters.medical_condition != "" else ""}
            {"AND m.health_status = :health_status" if filters.health_status != "" else ""}
        GROUP BY c.citizen_id, c.name, c.dob, c.household_id, h.address
        ORDER BY age;
    """
    )

    params = {
        "min_age": min_age,
        "max_age": max_age,
        "min_income": min_income,
        "max_income": max_income,
    }
    if filters.medical_condition:
        params["medical_condition"] = filters.medical_condition
    if filters.health_status:
        params["health_status"] = filters.health_status

    result = db.execute(sql, params).fetchall()

    return [
        {
            "Citizen ID": row[0],
            "Name": row[1],
            "Age": row[2],
            "Household ID": row[3],
            "Address": row[4],
            "Medical Condition": row[5],
            "Health Status": row[6],
        }
        for row in result
    ]
