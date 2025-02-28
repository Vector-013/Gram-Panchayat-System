from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(prefix="/api", tags=["Geo Features"])


@router.get("/{citizen_id}/geo", response_model=list)
def get_geo_features(citizen_id: int, db: Session = Depends(get_db)):
    """
    Returns the entire geo_features table.
    The response is a list of objects with keys:
      - feature_id
      - feature_type
      - name
      - area
    Example output:
    [
      {
        "feature_id": 2,
        "feature_type": "River",
        "name": "Ganga",
        "area": 2500.75
      },
      ...
    ]
    """
    sql = text(
        """
        SELECT 
            feature_id,
            feature_type,
            name,
            area
        FROM geo_features
        ORDER BY feature_id;
    """
    )

    try:
        result = db.execute(sql)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "feature_id": row.feature_id,
                    "feature_type": row.feature_type,
                    "name": row.name,
                    "area": float(row.area) if row.area is not None else None,
                }
            )
        return output
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
