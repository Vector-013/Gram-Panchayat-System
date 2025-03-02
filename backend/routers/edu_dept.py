from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional, List

from database import get_db

from schemas import EduDeptQuery, EduDeptResult

router = APIRouter(prefix="/edu-dept", tags=["EduDept Query"])


@router.post("/edu-query", response_model=List[EduDeptResult])
def edu_dept_query(query: EduDeptQuery, db: Session = Depends(get_db)):
    if query.gender != "All":
        sql = text(
            """
            WITH household_income AS (
                SELECT household_id, SUM(income) AS total_income
                FROM citizens
                GROUP BY household_id
            )
            SELECT 
                c.citizen_id,
                c.name,
                c.gender,
                TO_CHAR(c.dob, 'YYYY-MM-DD') AS dob,
                c.educational_qualification AS educational_level,
                hi.total_income
            FROM citizens c
            JOIN household_income hi ON c.household_id = hi.household_id
            WHERE c.gender = :gender
            AND c.educational_qualification = :educational_level
            AND c.dob BETWEEN :dob_min AND :dob_max
            AND hi.total_income BETWEEN :income_min AND :income_max
        """
        )
    else:
        sql = text(
            """
            WITH household_income AS (
                SELECT household_id, SUM(income) AS total_income
                FROM citizens
                GROUP BY household_id
            )
            SELECT 
                c.citizen_id,
                c.name,
                c.gender,
                TO_CHAR(c.dob, 'YYYY-MM-DD') AS dob,
                c.educational_qualification AS educational_level,
                hi.total_income
            FROM citizens c
            JOIN household_income hi ON c.household_id = hi.household_id
            WHERE c.educational_qualification = :educational_level
            AND c.dob BETWEEN :dob_min AND :dob_max
            AND hi.total_income BETWEEN :income_min AND :income_max
        """
        )
    params = {
        "gender": query.gender,
        "educational_level": query.educational_level,
        "dob_min": query.dob_min,
        "dob_max": query.dob_max,
        "income_min": query.income_min,
        "income_max": query.income_max,
    }

    if query.gender == "":
        query.gender = "All"

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "citizen_id": row.citizen_id,
                    "name": row.name,
                    "gender": row.gender,
                    "dob": row.dob,
                    "educational_level": row.educational_level,
                    "total_income": float(row.total_income),
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
