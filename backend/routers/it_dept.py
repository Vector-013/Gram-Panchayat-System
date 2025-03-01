from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional, List

from database import get_db

from schemas import LandQuery, LandQueryResult, ITAssetQuery, TaxQuery

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


@router.post("/asset-query", response_model=list)
def asset_query(query: ITAssetQuery, db: Session = Depends(get_db)):
    # Build the base SQL query with mandatory filter on asset value.
    base_sql = """
        SELECT 
            asset_id,
            type,
            location,
            to_char(installation_date, 'YYYY-MM-DD') AS installation_date,
            value
        FROM assets
        WHERE value BETWEEN :value_min AND :value_max
    """
    params = {"value_min": query.value_min, "value_max": query.value_max}

    # Filter by asset type if provided (non-empty)
    if query.asset_type != "":
        base_sql += " AND type = :asset_type"
        params["asset_type"] = query.asset_type

    # Filter by location if provided (non-empty)
    if query.location != "":
        base_sql += " AND location = :location"
        params["location"] = query.location

    # Filter by installation_date range if provided
    if query.start_date is not None:
        base_sql += " AND installation_date >= :start_date"
        params["start_date"] = query.start_date
    if query.end_date is not None:
        base_sql += " AND installation_date <= :end_date"
        params["end_date"] = query.end_date

    base_sql += " ORDER BY asset_id;"

    sql = text(base_sql)

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "asset_id": row.asset_id,
                    "type": row.type,
                    "location": row.location,
                    "installation_date": row.installation_date,
                    "value": float(row.value),
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/taxes", response_model=dict)
def tax_query(query: TaxQuery, db: Session = Depends(get_db)):
    base_sql = """
        SELECT 
            t.tax_id,
            c.citizen_id,
            c.name,
            c.household_id,
            t.amount,
            to_char(t.date, 'YYYY-MM-DD') AS date,
            t.payment_status
        FROM taxes t
        JOIN citizens c ON t.citizen_id = c.citizen_id
        WHERE t.amount BETWEEN :min_amount AND :max_amount
    """
    params = {"min_amount": query.min_amount, "max_amount": query.max_amount}

    if query.query_type == "person":
        base_sql += " AND t.citizen_id = :id"
        params["id"] = query.id

    elif query.query_type == "household":
        household_citizens_sql = """
            SELECT citizen_id FROM citizens WHERE household_id = :id
        """
        household_citizens = db.execute(
            text(household_citizens_sql), {"id": query.id}
        ).fetchall()
        if not household_citizens:
            raise HTTPException(
                status_code=404,
                detail="Household not found or no citizens in household",
            )

        citizen_ids = [str(row[0]) for row in household_citizens]
        base_sql += f" AND t.citizen_id IN ({', '.join(citizen_ids)})"

    if query.start_date is not None:
        base_sql += " AND t.date >= :start_date"
        params["start_date"] = query.start_date
    if query.end_date is not None:
        base_sql += " AND t.date <= :end_date"
        params["end_date"] = query.end_date

    base_sql += " ORDER BY t.payment_status DESC, t.date ASC;"

    sql = text(base_sql)

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()

        paid_taxes = []
        pending_taxes = []
        total_paid = 0
        total_pending = 0

        for row in rows:
            tax_record = {
                "tax_id": row.tax_id,
                "citizen_id": row.citizen_id,
                "name": row.name,
                "household_id": row.household_id,
                "amount": float(row.amount),
                "date": row.date,
                "status": row.payment_status,
            }
            if row.payment_status == "Paid":
                paid_taxes.append(tax_record)
                total_paid += float(row.amount)
            else:
                pending_taxes.append(tax_record)
                total_pending += float(row.amount)

        return {
            "paid_taxes": paid_taxes,
            "pending_taxes": pending_taxes,
            "total_paid": total_paid,
            "total_pending": total_pending,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
