from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text, bindparam
from database import get_db
from typing import Optional
from pydantic import BaseModel
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/census", tags=["Census"])


class BirthQueryRequest(BaseModel):
    gender: str  # "Male", "Female", or "Both"
    household_id: Optional[int] = None
    min_year: Optional[int] = None
    max_year: Optional[int] = None


@router.put("/birth-query")
def birth_query(
    query: BirthQueryRequest,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin/pradhan/employee/welfare can fetch birth details",
        )

    gender_filter = []
    if query.gender in {"Male", "Female"}:
        gender_filter.append(query.gender)
    elif query.gender == "Both":
        gender_filter = ["Male", "Female"]

    sql = text(
        """
        SELECT 
            c.citizen_id, c.name, c.gender, c.dob, c.household_id 
        FROM births b
        JOIN citizens c ON b.child_id = c.citizen_id
        WHERE 
            (:household_id IS NULL OR c.household_id = :household_id)
            AND (:min_year IS NULL OR EXTRACT(YEAR FROM c.dob) >= :min_year)
            AND (:max_year IS NULL OR EXTRACT(YEAR FROM c.dob) <= :max_year)
            AND (c.gender IN :gender_list)
        ORDER BY c.dob DESC;
    """
    ).bindparams(
        bindparam("household_id", query.household_id),
        bindparam("min_year", query.min_year),
        bindparam("max_year", query.max_year),
        bindparam("gender_list", expanding=True),
    )

    try:
        result = db.execute(
            sql,
            {
                "household_id": query.household_id,
                "min_year": query.min_year,
                "max_year": query.max_year,
                "gender_list": gender_filter,
            },
        )
        rows = result.fetchall()
        births = [dict(row._mapping) for row in rows]
        return {"births": births}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/geo-query", response_model=list)
def get_geo_features(
    db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):

    if user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin/pradhan/employee/welfare can fetch geo features",
        )
    """
    Returns the entire geo_features table.
    The response is a list of objects with keys:
      - feature_id
      - feature_type
      - name
      - area
    Example output:
    [
      {
        "feature_id": 2,
        "feature_type": "River",
        "name": "Ganga",
        "area": 2500.75
      },
      ...
    ]
    """
    sql = text(
        """
        SELECT 
            feature_id,
            feature_type,
            name,
            area
        FROM geo_features
        ORDER BY feature_id;
    """
    )

    try:
        result = db.execute(sql)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "feature_id": row.feature_id,
                    "feature_type": row.feature_type,
                    "name": row.name,
                    "area": float(row.area) if row.area is not None else None,
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


from pydantic import BaseModel, Field
from typing import Optional


class MarriageQuery(BaseModel):
    household_id: Optional[int] = Field(
        None,
        description="Household ID to filter by. If omitted, all households are considered.",
    )
    year_min: Optional[int] = Field(
        None,
        description="Minimum marriage year. If omitted, no lower bound is applied.",
    )
    year_max: Optional[int] = Field(
        None,
        description="Maximum marriage year. If omitted, no upper bound is applied.",
    )


@router.post("/marriage-query", response_model=dict)
def marriage_query(
    query: MarriageQuery,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),  # Uncomment if auth is needed
):

    if current_user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin/pradhan/employee/welfare can fetch marriage details",
        )
    # We'll use the provided filters, using None for any missing bound.
    household_id = query.household_id
    year_min = query.year_min
    year_max = query.year_max

    sql = text(
        """
        WITH marriages_with_households AS (
            SELECT 
                m.husband_id, 
                m.wife_id, 
                m.marriage_date,
                ch.name AS husband_name,
                cw.name AS wife_name,
                h1.household_id AS husband_household,
                h2.household_id AS wife_household,
                h1.address AS husband_address,
                h2.address AS wife_address
            FROM marriage m
            JOIN citizens ch ON m.husband_id = ch.citizen_id
            JOIN citizens cw ON m.wife_id = cw.citizen_id
            LEFT JOIN households h1 ON ch.household_id = h1.household_id
            LEFT JOIN households h2 ON cw.household_id = h2.household_id
        )
        SELECT * FROM marriages_with_households
        WHERE (:household_id IS NULL OR (husband_household = :household_id OR wife_household = :household_id))
          AND (:year_min IS NULL OR EXTRACT(YEAR FROM marriage_date) >= :year_min)
          AND (:year_max IS NULL OR EXTRACT(YEAR FROM marriage_date) <= :year_max)
        ORDER BY marriage_date DESC;
    """
    )

    params = {"household_id": household_id, "year_min": year_min, "year_max": year_max}
    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        marriages = [dict(row._mapping) for row in rows]
        return {"marriages": marriages}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/death-query", response_model=dict)
def death_query(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):

    if user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin/pradhan/employee/welfare can fetch death details",
        )
    try:
        sql = text(
            """
            SELECT 
                d.citizen_id,
                c.name,
                EXTRACT(YEAR FROM age(d.date, c.dob))::int AS age_at_death,
                d.cause,
                c.gender,
                TO_CHAR(c.dob, 'YYYY-MM-DD') AS dob,
                c.household_id
            FROM deaths d
            JOIN citizens c ON d.citizen_id = c.citizen_id
            ORDER BY d.date DESC;
        """
        )
        result = db.execute(sql)
        rows = result.fetchall()
        death_data = [dict(row._mapping) for row in rows]
        return {"deaths": death_data}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
