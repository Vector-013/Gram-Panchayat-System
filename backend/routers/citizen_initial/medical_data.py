from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api", tags=["Medical Data"])


@router.get("/{citizen_id}/medical", response_model=list)
def get_medical_data(citizen_id: int, db: Session = Depends(get_db)):
    """
    Returns medical data for all citizens in the same household as the given citizen.
    The query uses a WITH clause to first determine the household of the given citizen,
    then selects all citizens in that household and joins with the medical_data table.
    Results are sorted by citizen name.
    """
    sql = text(
        """
        WITH household AS (
            SELECT household_id 
            FROM citizens 
            WHERE citizen_id = :citizen_id
        ),
        family AS (
            SELECT citizen_id, name 
            FROM citizens 
            WHERE household_id = (SELECT household_id FROM household)
        )
        SELECT 
            f.citizen_id,
            f.name,
            m.medical_id,
            m.health_status,
            m.medical_condition
        FROM family f
        JOIN medical_data m ON f.citizen_id = m.citizen_id
        ORDER BY f.name;
    """
    )
    params = {"citizen_id": citizen_id}

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "citizen_id": row.citizen_id,
                    "name": row.name,
                    "medical_id": row.medical_id,
                    "health_status": row.health_status,
                    "medical_condition": row.medical_condition,
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
