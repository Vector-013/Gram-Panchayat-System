from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from datetime import date
from schemas.budgets import AssetCreate
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/asset-management", tags=["Asset Management"])

# Mapping from asset types to budget categories
CATEGORY_MAPPING = {
    "Street Light": "Assets",
    "School": "Education",
    "Road": "Roads",
    "Library": "Miscellaneous",
    "Public Toilet": "Assets",
    "Hospital": "Healthcare",
    "Water Pump": "Water Supply",
    "Well": "Water Supply",
}


@router.post("/", response_model=dict)
def allocate_asset(
    asset_data: AssetCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    if user["role"] not in {"admin", "pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to manage assets",
        )

    category = CATEGORY_MAPPING.get(asset_data.type)
    if not category:
        raise HTTPException(status_code=400, detail="Invalid asset type")

    # Check available budget for the category
    budget_sql = text(
        """
        SELECT COALESCE(SUM(amount - spent), 0) AS remaining_budget
        FROM budget
        WHERE category = :category;
    """
    )
    
    remaining_budget = db.execute(budget_sql, {"category": category}).scalar()
    # print(remaining_budget)
    # print(asset_data.value)
    # if remaining_budget is None or remaining_budget < asset_data.value:
    #     raise HTTPException(status_code=400, detail="Insufficient budget")

    try:
        asset_sql = text(
            """
            INSERT INTO assets (type, location, installation_date, value)
            VALUES (:type, :location, :installation_date, :value)
            RETURNING asset_id, type, location, to_char(installation_date, 'YYYY-MM-DD') as installation_date, value;
        """
        )
        params = {
            "type": asset_data.type,
            "location": asset_data.location,
            "installation_date": asset_data.installation_date.strip() or None,
            "value": asset_data.value,
        }
        result = db.execute(asset_sql, params)
        new_asset = result.fetchone()

        # Update the budget spent value
        update_sql = text(
            """
            UPDATE budget SET spent = spent + :value WHERE category = :category;
        """
        )
        db.execute(update_sql, {"category": category, "value": asset_data.value})
        db.commit()

        if not new_asset:
            raise HTTPException(status_code=500, detail="Asset creation failed")

        return {
            "asset_id": new_asset.asset_id,
            "type": new_asset.type,
            "location": new_asset.location,
            "installation_date": new_asset.installation_date,
            "value": float(new_asset.value),
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
