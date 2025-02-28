from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api/it-dept", tags=["IT Analytics"])


@router.get("/analytics1")
def get_it_analytics(db: Session = Depends(get_db)):
    sql = text(
        """
        WITH budget_summary AS (
            SELECT 
                EXTRACT(YEAR FROM created_at) AS year,
                SUM(amount) AS total_budget
            FROM budget
            GROUP BY year
            ORDER BY year
        ),
        salary_summary AS (
            SELECT 
                SUM(c.income) * 12 AS total_salaries
            FROM panchayat_employees e
            JOIN citizens c ON e.citizen_id = c.citizen_id
        ),
        asset_summary AS (
            SELECT 
                EXTRACT(YEAR FROM installation_date) AS year,
                SUM(value) AS total_assets
            FROM assets
            GROUP BY year
            ORDER BY year
        ),
        tax_summary AS (
            SELECT 
                EXTRACT(YEAR FROM date) AS year,
                SUM(amount) AS total_taxes
            FROM taxes
            WHERE payment_status = 'Paid'
            GROUP BY year
            ORDER BY year
        )
        SELECT 
            b.year, b.total_budget,
            a.year AS asset_year, a.total_assets,
            t.year AS tax_year, t.total_taxes,
            s.total_salaries
        FROM budget_summary b
        FULL OUTER JOIN asset_summary a ON b.year = a.year
        FULL OUTER JOIN tax_summary t ON COALESCE(b.year, a.year) = t.year
        CROSS JOIN salary_summary s
        ORDER BY COALESCE(b.year, a.year, t.year);
    """
    )

    try:
        result = db.execute(sql)
        rows = result.fetchall()

        if not rows:
            return {"budget": [], "salaries": 0, "assets": [], "taxes": []}

        budget = []
        assets = []
        taxes = []
        total_salaries = 0

        for row in rows:
            if row.total_budget is not None:
                budget.append(
                    {"year": row.year, "total_budget": float(row.total_budget)}
                )
            if row.total_assets is not None:
                assets.append(
                    {"year": row.asset_year, "total_assets": float(row.total_assets)}
                )
            if row.total_taxes is not None:
                taxes.append(
                    {"year": row.tax_year, "total_taxes": float(row.total_taxes)}
                )
            if row.total_salaries is not None:
                total_salaries = float(row.total_salaries)

        return {
            "budget": budget,
            "salaries": total_salaries,
            "assets": assets,
            "taxes": taxes,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
