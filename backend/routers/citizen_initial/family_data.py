from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api", tags=["Family Data"])


@router.get("/{citizen_id}/fam-data", response_model=dict)
def get_family_data(citizen_id: int, db: Session = Depends(get_db)):
    # Pure SQL query using a WITH clause to build family data
    sql = text(
        """
        WITH family AS (
            SELECT 
                c.*,
                EXTRACT(YEAR FROM age(c.dob)) AS age,
                CASE 
                    WHEN (date_trunc('year', CURRENT_DATE) + (c.dob - date_trunc('year', c.dob))) < CURRENT_DATE
                    THEN date_trunc('year', CURRENT_DATE) + (c.dob - date_trunc('year', c.dob)) + interval '1 year'
                    ELSE date_trunc('year', CURRENT_DATE) + (c.dob - date_trunc('year', c.dob))
                END AS next_birthday
            FROM citizens c
            WHERE c.household_id = (
                SELECT household_id FROM citizens WHERE citizen_id = :citizen_id
            )
        ),
        agg AS (
            SELECT 
                SUM(COALESCE(income, 0)) AS total_family_income,
                json_agg(json_build_object(
                    'citizen_id', citizen_id,
                    'name', name,
                    'gender', gender,
                    'income', income,
                    'educational_qualification', educational_qualification,
                    'dob', to_char(dob, 'YYYY-MM-DD'),
                    'age', age
                )) AS family_members,
                (SELECT to_char(next_birthday, 'YYYY-MM-DD')
                 FROM family
                 ORDER BY (next_birthday - CURRENT_DATE) ASC
                 LIMIT 1) AS closest_birthday
            FROM family
        )
        SELECT * FROM agg;
    """
    )

    params = {"citizen_id": citizen_id}
    try:
        result = db.execute(sql, params)
        row = result.fetchone()
        if row is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No family data found"
            )
        # The query returns a single row with the aggregated data.
        return {
            "family_members": row.family_members,
            "total_family_income": (
                float(row.total_family_income)
                if row.total_family_income is not None
                else 0.0
            ),
            "closest_birthday": row.closest_birthday,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
