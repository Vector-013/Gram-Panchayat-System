from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
import datetime

from database import get_db
from schemas.citizen_init import FamLandData, FamLandRecord, FamLandSummary

router = APIRouter(prefix="/api", tags=["Family Land Data"])


@router.get("/{citizen_id}/fam-land", response_model=FamLandData)
def get_family_land(citizen_id: int, db: Session = Depends(get_db)):
    sql = text(
        """
        WITH household_info AS (
            SELECT household_id 
            FROM citizens 
            WHERE citizen_id = :citizen_id
        ),
        family_land AS (
            SELECT 
                c.citizen_id,
                c.name,
                c.dob,
                lr.area_acres,
                lr.crop_type
            FROM citizens c
            JOIN land_records lr ON c.citizen_id = lr.citizen_id
            WHERE c.household_id = (SELECT household_id FROM household_info)
        ),
        family_totals AS (
            SELECT SUM(area_acres) AS total_family_land FROM family_land
        ),
        citizen_total AS (
            SELECT SUM(lr.area_acres) AS total_person_land
            FROM citizens c
            JOIN land_records lr ON c.citizen_id = lr.citizen_id
            WHERE c.citizen_id = :citizen_id
        )
        SELECT 
            fl.citizen_id,
            fl.name,
            EXTRACT(YEAR FROM age(fl.dob))::int AS age,
            fl.area_acres,
            fl.crop_type,
            ct.total_person_land,
            ft.total_family_land
        FROM family_land fl, family_totals ft, citizen_total ct
        ORDER BY fl.citizen_id;
    """
    )
    params = {"citizen_id": citizen_id}

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        if not rows:
            # If no land records, return empty list and zero totals.
            summary = FamLandSummary(total_person_land=0.0, total_family_land=0.0)
            return FamLandData(records=[], summary=summary)

        # We'll build the records list. The summary will be the same in every row, so we take it from the first row.
        records = []
        for row in rows:
            record = FamLandRecord(
                citizen_id=row.citizen_id,
                name=row.name,
                age=row.age,
                area_acres=float(row.area_acres),
                crop_type=row.crop_type,
            )
            records.append(record)

        summary = FamLandSummary(
            total_person_land=(
                float(rows[0].total_person_land)
                if rows[0].total_person_land is not None
                else 0.0
            ),
            total_family_land=(
                float(rows[0].total_family_land)
                if rows[0].total_family_land is not None
                else 0.0
            ),
        )
        return FamLandData(records=records, summary=summary)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
