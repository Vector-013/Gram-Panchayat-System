from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api", tags=["Taxes"])


@router.get("/{citizen_id}/taxes", response_model=list)
def get_family_taxes(citizen_id: int, db: Session = Depends(get_db)):
    """
    Retrieves tax records for all citizens in the same household as the given citizen.
    The result includes:
      - tax_id, citizen_id, name, payment_status, type, tax_amount, and year (extracted from date)
    The query uses a WITH clause to first determine the household of the provided citizen, then
    selects family members and joins their records with the taxes table.
    """
    sql = text(
        """
        WITH family AS (
            SELECT citizen_id, name
            FROM citizens
            WHERE household_id = (
                SELECT household_id FROM citizens WHERE citizen_id = :citizen_id
            )
        )
        SELECT 
            t.tax_id,
            t.citizen_id,
            f.name,
            t.payment_status,
            t.type,
            t.amount AS tax_amount,
            EXTRACT(YEAR FROM t.date) AS year
        FROM taxes t
        JOIN family f ON t.citizen_id = f.citizen_id
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
                    "tax_id": row.tax_id,
                    "citizen_id": row.citizen_id,
                    "name": row.name,
                    "payment_status": row.payment_status,
                    "type": row.type,
                    "tax_amount": (
                        float(row.tax_amount) if row.tax_amount is not None else 0.0
                    ),
                    "year": int(row.year) if row.year is not None else None,
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
