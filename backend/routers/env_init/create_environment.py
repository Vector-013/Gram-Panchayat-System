from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from datetime import date
from database import get_db
from utils import fetch_env_data_from_api
from routers.posts.dependencies import get_current_user



router = APIRouter(prefix="/get-today-env", tags=["Environmental Data"])


@router.get("/", response_model=dict)
def get_today_env_data(
    db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):

    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can fetch citizen details",
        )
    today = date.today()

    # Check if today's data exists
    sql_check = text(
        """
        SELECT env_id, aqi, temperature, humidity, rainfall, 
               to_char(date_recorded, 'YYYY-MM-DD') AS date_recorded
        FROM environmental_data
        WHERE date_recorded = :today
    """
    )
    existing = db.execute(sql_check, {"today": today}).fetchone()

    if existing is None:
        try:
            # Fetch environmental data from external API
            env_data = fetch_env_data_from_api()
        except:
            env_data = {
                "aqi": 53,
                "temperature": 29,
                "humidity": 30,
                "rainfall": 2,
            }

        # Insert the fetched data into the database
        sql_insert = text(
            """
            INSERT INTO environmental_data (aqi, temperature, humidity, rainfall, date_recorded)
            VALUES (:aqi, :temperature, :humidity, :rainfall, :date_recorded)
            RETURNING env_id, aqi, temperature, humidity, rainfall, to_char(date_recorded, 'YYYY-MM-DD') AS date_recorded
        """
        )
        params = {
            "aqi": env_data["aqi"],
            "temperature": env_data["temperature"],
            "humidity": env_data["humidity"],
            "rainfall": env_data["rainfall"],
            "date_recorded": today,
        }
        result = db.execute(sql_insert, params)
        db.commit()
        today_record = result.fetchone()
    else:
        today_record = existing

    # Fetch all environmental data for analytics
    sql_all = text(
        """
        SELECT env_id, aqi, temperature, humidity, rainfall, 
               to_char(date_recorded, 'YYYY-MM-DD') AS date_recorded
        FROM environmental_data
        ORDER BY date_recorded ASC;
    """
    )
    all_records = db.execute(sql_all).fetchall()

    # Convert rows to dicts using _mapping
    return {
        "today_data": dict(today_record._mapping),
        "all_data": [dict(row._mapping) for row in all_records],
    }
