from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from pydantic import BaseModel
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/welfare/mgnrega", tags=["Welfare - MGNREGA"])


# Request body model
class MGNREGAFilter(BaseModel):
    min_age: int = 0
    max_age: int = 150
    min_household_income: float = 0
    max_household_income: float = float("inf")
    personal_income: float = float("inf")


@router.post("/")
def get_mgnrega_data(
    filters: MGNREGAFilter,
    db: Session = Depends(get_db),
    user: dict = Depends(
        lambda: {"role": "welfare"}
    ),  # Example; replace with actual dependency e.g., get_current_user
):
    # Authorization check: Only allow if user role is in allowed roles.
    if user["role"] not in {"pradhan", "employee", "admin", "welfare"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view MGNREGA data",
        )

    sql = text(
        f"""
        -- Step 1: Compute Household Income
        WITH household_income AS (
            SELECT c.household_id, COALESCE(SUM(c.income), 0) AS total_income
            FROM citizens c
            GROUP BY c.household_id
        ),

        -- Step 2: Find Eligible Citizens
        eligible AS (
            SELECT 
                c.citizen_id, 
                c.name, 
                EXTRACT(YEAR FROM AGE(c.dob))::int AS age,
                c.household_id, 
                h.address, 
                c.income AS personal_income,
                hi.total_income AS household_income
            FROM citizens c
            JOIN household_income hi ON c.household_id = hi.household_id
            JOIN households h ON c.household_id = h.household_id
            WHERE 
                EXTRACT(YEAR FROM AGE(c.dob)) BETWEEN :min_age AND :max_age
                AND hi.total_income BETWEEN :min_household_income AND :max_household_income
                AND c.income <= :personal_income
        ),

        -- Step 3: Get Citizens Enrolled in MGNREGA
        enrolled_mgnrega AS (
            SELECT se.citizen_id 
            FROM scheme_enrollments se
            JOIN welfare_schemes ws ON se.scheme_id = ws.scheme_id
            WHERE ws.name = 'MGNREGA'
        )

        -- Step 4: Final Result
        SELECT 
            e.citizen_id, e.name, e.age, e.household_id, e.address, e.personal_income, e.household_income,
            CASE WHEN e.citizen_id IN (SELECT citizen_id FROM enrolled_mgnrega) THEN 'Enrolled' ELSE 'Not Enrolled' END AS enrollment_status
        FROM eligible e;
    """
    )

    params = {
        "min_age": filters.min_age,
        "max_age": filters.max_age,
        "min_household_income": filters.min_household_income,
        "max_household_income": filters.max_household_income,
        "personal_income": filters.personal_income,
    }

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()

        enrolled = []
        not_enrolled = []
        for row in rows:
            entry = {
                "Citizen ID": row.citizen_id,
                "Name": row.name,
                "Age": row.age,
                "Household ID": row.household_id,
                "Address": row.address,
                "Personal Income": (
                    float(row.personal_income)
                    if row.personal_income is not None
                    else 0.0
                ),
                "Household Income": (
                    float(row.household_income)
                    if row.household_income is not None
                    else 0.0
                ),
            }
            if row.enrollment_status == "Enrolled":
                enrolled.append(entry)
            else:
                not_enrolled.append(entry)

        return {
            "eligible_and_enrolled": enrolled,
            "eligible_but_not_enrolled": not_enrolled,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
