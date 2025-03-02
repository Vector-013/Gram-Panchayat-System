from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import date
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="", tags=["Environmental Data"])


@router.get("/census-env", response_model=dict)
def get_environmental_data(
    db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):

    if user["role"] not in {"pradhan", "employee", "admin", "census_dept"}:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view environmental data",
        )
    """
    Fetch all environmental data records and also return today's specific environmental details.
    """
    sql_all = text(
        """
        SELECT 
            env_id, aqi, temperature, humidity, rainfall, 
            to_char(date_recorded, 'YYYY-MM-DD') AS date_recorded
        FROM environmental_data
        ORDER BY date_recorded DESC;
    """
    )

    sql_today = text(
        """
        SELECT 
            aqi, temperature, humidity, rainfall 
        FROM environmental_data
        WHERE date_recorded = CURRENT_DATE;
    """
    )

    try:
        # Fetch all environmental records
        result_all = db.execute(sql_all)
        env_records = result_all.fetchall()

        # Fetch today's environmental data
        result_today = db.execute(sql_today)
        today_record = result_today.fetchone()

        env_list = [
            {
                "env_id": row.env_id,
                "aqi": row.aqi,
                "temperature": row.temperature,
                "humidity": row.humidity,
                "rainfall": row.rainfall,
                "date_recorded": row.date_recorded,
            }
            for row in env_records
        ]

        # Default today's values in case no data is available
        today_data = {
            "temp_today": None,
            "humidity_today": None,
            "rainfall_today": None,
            "aqi_today": None,
        }

        if today_record:
            today_data = {
                "temp_today": today_record.temperature,
                "humidity_today": today_record.humidity,
                "rainfall_today": today_record.rainfall,
                "aqi_today": today_record.aqi,
            }

        return {"env": env_list, **today_data}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
