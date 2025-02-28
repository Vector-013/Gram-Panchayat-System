from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from schemas.asset_query import AssetQuery

router = APIRouter(prefix="/api/assets", tags=["Asset Query"])


@router.post("/query", response_model=list)
def query_assets(query: AssetQuery, db: Session = Depends(get_db)):
    # Base query to filter on value
    base_sql = """
        SELECT asset_id, type, location, 
               to_char(installation_date, 'YYYY-MM-DD') AS installation_date, 
               value
        FROM assets
        WHERE value BETWEEN :value_min AND :value_max
    """
    # Add filter for asset type if provided (non-empty)
    if query.type != "":
        base_sql += " AND type = :type"
    # Add filter for location if provided (non-empty)
    if query.location != "":
        base_sql += " AND location = :location"

    base_sql += " ORDER BY asset_id;"

    sql = text(base_sql)

    params = {
        "value_min": query.value_min,
        "value_max": query.value_max,
    }
    if query.type != "":
        params["type"] = query.type
    if query.location != "":
        params["location"] = query.location

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
