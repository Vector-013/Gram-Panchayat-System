from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from schemas.edu_dept import SingleGirlQuery  # Re-use the query schema from before

router = APIRouter(prefix="/api/edu", tags=["Edu Dept - Single Girl Child"])


@router.post("/single-girl-child", response_model=dict)
def single_girl_child(query: SingleGirlQuery, db: Session = Depends(get_db)):
    sql = text(
        """
        WITH household_income AS (
            SELECT 
                household_id, 
                SUM(COALESCE(income, 0)) AS total_income
            FROM citizens
            GROUP BY household_id
        ),
        eligible_girls AS (
            SELECT 
                c.citizen_id, 
                c.name, 
                EXTRACT(YEAR FROM age(c.dob))::int AS age, 
                hi.total_income AS household_income, 
                h.address
            FROM citizens c
            JOIN households h ON c.household_id = h.household_id
            JOIN household_income hi ON c.household_id = hi.household_id
            WHERE c.gender = 'Female'
              AND EXTRACT(YEAR FROM age(c.dob))::int BETWEEN :min_age AND :max_age
              AND hi.total_income BETWEEN :min_household_income AND :max_household_income
        ),
        enrolled_girls AS (
            SELECT eg.* 
            FROM eligible_girls eg
            JOIN scheme_enrollments se ON eg.citizen_id = se.citizen_id
            JOIN welfare_schemes ws ON se.scheme_id = ws.scheme_id
            WHERE ws.name = 'Single Girl Policy'
        )
        SELECT 'enrolled' AS category, json_agg(enrolled_girls) AS data\n
        FROM enrolled_girls
        UNION ALL
        SELECT 'not_enrolled' AS category, json_agg(eg) AS data\n
        FROM eligible_girls eg\n
        WHERE eg.citizen_id NOT IN (SELECT citizen_id FROM enrolled_girls);
    """
    )

    params = {
        "min_age": query.min_age,
        "max_age": query.max_age,
        "min_household_income": query.min_household_income,
        "max_household_income": query.max_household_income,
    }

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        # Construct the final result dictionary from the two rows.
        output = {}
        for row in rows:
            # If there are no records, row.data might be null so we return an empty list.
            output[row.category] = row.data if row.data is not None else []
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
