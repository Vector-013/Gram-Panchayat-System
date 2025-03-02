from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db

router = APIRouter(prefix="/flora-fauna-assets", tags=["Flora Fauna & Assets"])

@router.get("/", response_model=dict)
def get_flora_fauna_assets(db: Session = Depends(get_db)):
    try:
        # Fetch all asset records
        sql_assets = text("""
            SELECT 
                asset_id,
                type,
                location,
                to_char(installation_date, 'YYYY-MM-DD') AS installation_date,
                value
            FROM assets
            ORDER BY asset_id;
        """)
        assets_result = db.execute(sql_assets).fetchall()
        assets_list = [dict(row._mapping) for row in assets_result]

        # Fetch all flora_fauna records
        sql_flora_fauna = text("""
            SELECT 
                f_id,
                type,
                name,
                habitat,
                count
            FROM flora_fauna
            ORDER BY f_id;
        """)
        flora_fauna_result = db.execute(sql_flora_fauna).fetchall()
        flora_fauna_list = [dict(row._mapping) for row in flora_fauna_result]

        return {"assets": assets_list, "flora_fauna": flora_fauna_list}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
