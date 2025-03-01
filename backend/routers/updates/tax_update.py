from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import date
from database import get_db

router = APIRouter(prefix="/update-taxes", tags=["Tax Update"])


@router.post("/", response_model=dict)
def update_taxes(db: Session = Depends(get_db)):
    current_year = date.today().year
    last_day_of_year = (
        f"{current_year}-12-31"  # Set date to December 31st of the current year
    )

    try:
        # Insert new taxes only if they do not already exist for the current year
        sql_insert = text(
            """
            INSERT INTO taxes (type, amount, payment_status, citizen_id, date)
            SELECT 
                'Income Tax' AS type,
                t.amount,
                'Pending' AS payment_status,
                t.citizen_id,
                :last_day_of_year AS date
            FROM taxes t
            JOIN citizens c ON t.citizen_id = c.citizen_id
            LEFT JOIN deaths d ON c.citizen_id = d.citizen_id
            WHERE t.type = 'Income Tax'
              AND EXTRACT(YEAR FROM t.date) != :current_year
              AND d.citizen_id IS NULL
              AND NOT EXISTS (
                  SELECT 1 FROM taxes t2 
                  WHERE t2.citizen_id = t.citizen_id 
                  AND t2.type = 'Income Tax' 
                  AND EXTRACT(YEAR FROM t2.date) = :current_year
              );
        """
        )
        result = db.execute(
            sql_insert,
            {"current_year": current_year, "last_day_of_year": last_day_of_year},
        )
        inserted = result.rowcount
        db.commit()
        return {
            "message": f"Taxes updated for current year. {inserted} records inserted."
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
