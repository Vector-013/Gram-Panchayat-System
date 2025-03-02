from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text, bindparam
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/welfare/analytics", tags=["Welfare Analytics"])

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


@router.get("/", response_model=dict)
def welfare_analytics(
    db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):

    if user["role"] not in {"pradhan", "employee", "admin", "welfare"}:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view welfare analytics",
        )

    try:
        # 1. Medical Analysis
        sql_medical = text(
            """
            SELECT m.medical_condition, c.gender, COUNT(*) AS count
            FROM medical_data m
            JOIN citizens c ON m.citizen_id = c.citizen_id
            WHERE m.medical_condition IN :conditions
            GROUP BY m.medical_condition, c.gender
            ORDER BY m.medical_condition, c.gender;
        """
        ).bindparams(bindparam("conditions", expanding=True))

        medical_params = {"conditions": list(VALID_MEDICAL_CONDITIONS)}
        medical_rows = db.execute(sql_medical, medical_params).fetchall()
        medical_analysis = [dict(row._mapping) for row in medical_rows]

        # 2. Vaccination Analysis
        sql_vaccine = text(
            """
            SELECT v.vaccination_type, c.gender, COUNT(*) AS count
            FROM vaccinations v
            JOIN citizens c ON v.citizen_id = c.citizen_id
            GROUP BY v.vaccination_type, c.gender
            ORDER BY v.vaccination_type, c.gender;
        """
        )
        vaccine_rows = db.execute(sql_vaccine).fetchall()
        vaccination_analysis = [dict(row._mapping) for row in vaccine_rows]

        # 3. Education Analysis
        sql_education = text(
            """
            SELECT educational_qualification, gender, COUNT(*) AS count
            FROM citizens
            GROUP BY educational_qualification, gender
            ORDER BY educational_qualification, gender;
        """
        )
        education_rows = db.execute(sql_education).fetchall()
        education_analysis = [dict(row._mapping) for row in education_rows]

        return {
            "medical_analysis": medical_analysis,
            "vaccination_analysis": vaccination_analysis,
            "education_analysis": education_analysis,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
