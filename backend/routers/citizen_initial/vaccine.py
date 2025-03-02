from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="", tags=["Vaccine Data"])


@router.get("/api/{citizen_id}/vaccine", response_model=list)
def get_vaccine_data(citizen_id: int, db: Session = Depends(get_db)):
    """
    Returns vaccination data for all citizens in the same household as the given citizen.
    Data includes:
      - citizen_id, vaccination_id, name, vaccination_type, date_administered, and age.
    """
    sql = text(
        """
        WITH family AS (
            SELECT citizen_id, name, dob
            FROM citizens
            WHERE household_id = (
                SELECT household_id FROM citizens WHERE citizen_id = :citizen_id
            )
        )
        SELECT 
            v.vaccination_id,
            f.citizen_id,
            f.name,
            v.vaccination_type,
            to_char(v.date_administered, 'YYYY-MM-DD') AS date_administered,
            EXTRACT(YEAR FROM age(f.dob))::int AS age
        FROM family f
        JOIN vaccinations v ON f.citizen_id = v.citizen_id
        ORDER BY f.name;
    """
    )

    params = {"citizen_id": citizen_id}

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        if not rows:
            return []  # Return empty list if no records found

        output = []
        for row in rows:
            output.append(
                {
                    "citizen_id": row.citizen_id,
                    "vaccination_id": row.vaccination_id,
                    "name": row.name,
                    "vaccination_type": row.vaccination_type,
                    "date_administered": row.date_administered,
                    "age": row.age,
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
