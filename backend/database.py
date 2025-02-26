from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get database credentials from environment variables
DB_HOST = os.getenv("DB_HOST", "10.5.18.73")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "22CS30039")
DB_USER = os.getenv("DB_USER", "22CS30039")
DB_PASSWORD = os.getenv("DB_PASSWORD", "Prime Vector 13")

# Construct PostgreSQL Database URL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD.replace(' ', '%20')}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create Engine
engine = create_engine(DATABASE_URL)

# Create Session Local class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()


# Dependency function to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
