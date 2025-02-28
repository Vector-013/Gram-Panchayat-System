from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional, List

from database import get_db

from schemas import LandQuery, LandQueryResult

router = APIRouter(prefix="/it-dept", tags=["ITDept Query"])


@router.post("/land-query", response_model=List[LandQueryResult])
def query_land_data(query: LandQuery, db: Session = Depends(get_db)):
    if query.role == "citizen":
        sql = text(
            """
            SELECT 
              c.citizen_id,
              c.name,
              h.address,
              c.income,
              EXTRACT(YEAR FROM age(c.dob)) AS age,
              SUM(lr.area_acres) AS total_area
            FROM citizens c
            JOIN households h ON c.household_id = h.household_id
            JOIN land_records lr ON c.citizen_id = lr.citizen_id
            WHERE (:crop_type IS NULL OR lr.crop_type = :crop_type)
            GROUP BY c.citizen_id, c.name, h.address, c.income, c.dob
            HAVING SUM(lr.area_acres) BETWEEN :lower_limit AND :upper_limit
        """
        )
    else:  # role is "panchayat"
        sql = text(
            """
            SELECT 
              c.citizen_id,
              c.name,
              h.address,
              c.income,
              EXTRACT(YEAR FROM age(c.dob)) AS age,
              lr_total.total_area
            FROM citizens c
            JOIN households h ON c.household_id = h.household_id
            JOIN (SELECT DISTINCT citizen_id FROM panchayat_employees) pe
              ON c.citizen_id = pe.citizen_id
            JOIN (
              SELECT citizen_id, SUM(area_acres) AS total_area
              FROM land_records
              WHERE (:crop_type IS NULL OR crop_type = :crop_type)
              GROUP BY citizen_id
            ) lr_total ON c.citizen_id = lr_total.citizen_id
            WHERE lr_total.total_area BETWEEN :lower_limit AND :upper_limit
        """
        )

    params = {
        "crop_type": query.crop_type,
        "lower_limit": query.lower_limit,
        "upper_limit": query.upper_limit,
    }
    # check if crop_type is empty string
    if not query.crop_type:
        params["crop_type"] = None

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "citizen_id": row.citizen_id,
                    "name": row.name,
                    "address": row.address,
                    "income": float(row.income) if row.income is not None else None,
                    "age": int(row.age) if row.age is not None else 0,
                    "total_area": (
                        float(row.total_area) if row.total_area is not None else 0.0
                    ),
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
