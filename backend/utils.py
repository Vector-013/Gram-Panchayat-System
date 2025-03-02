from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
from jwt import PyJWTError
import requests

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In production, load SECRET_KEY from environment variables!
SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        # expire = datetime.utcnow() + expires_delta  utc now is deprecated
        expire = datetime.now() + expires_delta
        
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def fetch_env_data_from_api() -> dict:
    """
    Fetches environmental data for Kolkata using real external APIs.
    Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key.
    """
    # Kolkata coordinates
    lat, lon = 22.5726, 88.3639
    api_key = "0f101bf566d1196e76cce89d6eebccd6"

    # Fetch AQI data from OpenWeatherMap Air Pollution API
    aqi_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
    aqi_response = requests.get(aqi_url)
    if aqi_response.status_code != 200:
        raise Exception(f"Failed to fetch AQI data: {aqi_response.status_code}")
    aqi_data = aqi_response.json()
    # OpenWeatherMap returns an 'aqi' index from 1 (Good) to 5 (Very Poor)
    aqi = aqi_data["list"][0]["main"]["aqi"]

    # Fetch weather data from OpenWeatherMap Current Weather API
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    weather_response = requests.get(weather_url)
    if weather_response.status_code != 200:
        raise Exception(f"Failed to fetch weather data: {weather_response.status_code}")
    weather_data = weather_response.json()
    temperature = weather_data["main"]["temp"]
    humidity = weather_data["main"]["humidity"]
    # Rainfall may not be provided; if not, default to 0
    rainfall = weather_data.get("rain", {}).get("1h", 0)

    return {
        "aqi": aqi,
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": rainfall,
    }
