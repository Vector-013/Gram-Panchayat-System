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
def get_geo_features(db: Session = Depends(get_db)):
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
