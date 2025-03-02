from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/census/analytics-data", tags=["Census Analytics"])


@router.get("/", response_model=dict)
def census_analytics_data(
    db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):

    if user["role"] not in {"pradhan", "employee", "admin", "census"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this resource.",
        )

    try:
        # Births: Count of births by year (from birth_date) and child's gender.
        sql_births = text(
            """
            SELECT EXTRACT(YEAR FROM b.birth_date)::int AS year,
                   c.gender,
                   COUNT(*) AS count
            FROM births b
            JOIN citizens c ON b.child_id = c.citizen_id
            GROUP BY year, c.gender
            ORDER BY year, c.gender;
        """
        )
        births_result = db.execute(sql_births).fetchall()
        births_data = [dict(row._mapping) for row in births_result]

        # Deaths: Count of deaths by year (from death date) and gender.
        sql_deaths = text(
            """
            SELECT EXTRACT(YEAR FROM d.date)::int AS year,
                   c.gender,
                   COUNT(*) AS count
            FROM deaths d
            JOIN citizens c ON d.citizen_id = c.citizen_id
            GROUP BY year, c.gender
            ORDER BY year, c.gender;
        """
        )
        deaths_result = db.execute(sql_deaths).fetchall()
        deaths_data = [dict(row._mapping) for row in deaths_result]

        # Marriages: Use a union of husband and wife rows, then group by marriage year and gender.
        sql_marriages = text(
            """
            WITH marriage_union AS (
                SELECT marriage_date, husband_id AS citizen_id FROM marriage
                UNION ALL
                SELECT marriage_date, wife_id AS citizen_id FROM marriage
            )
            SELECT EXTRACT(YEAR FROM mu.marriage_date)::int AS year,
                   c.gender,
                   COUNT(*) AS count
            FROM marriage_union mu
            JOIN citizens c ON mu.citizen_id = c.citizen_id
            GROUP BY year, c.gender
            ORDER BY year, c.gender;
        """
        )
        marriages_result = db.execute(sql_marriages).fetchall()
        marriages_data = [dict(row._mapping) for row in marriages_result]

        return {
            "births": births_data,
            "deaths": deaths_data,
            "marriages": marriages_data,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
