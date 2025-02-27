from sqlalchemy.orm import Session
from models.citizens import Citizen
from schemas.citizens import CitizenCreate
from sqlalchemy.sql import text


def get_citizens(db: Session):
    return db.query(Citizen).all()


def get_citizen_by_id(db: Session, citizen_id: int):
    return db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()


def get_citizen_by_email(db: Session, email: str):
    return db.query(Citizen).filter(Citizen.email == email).first()


from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from models.citizens import Citizen
from schemas.citizens import CitizenCreate
from utils import (
    get_password_hash,
)  # Ensure you have a utility for hashing the password


def create_citizen(db: Session, citizen: CitizenCreate):
    try:
        # Find max citizen_id and increment
        max_id_query = text("SELECT COALESCE(MAX(citizen_id), 0) FROM citizens")
        max_id = db.execute(max_id_query).scalar()
        new_id = max_id + 1

        print(f"[INFO]: New citizen ID: {new_id}")

        # Convert the Pydantic model to a dictionary
        citizen_data = citizen.model_dump()

        # Hash the password from the plain text value and store it in hashed_password.
        # Then remove the plain text password so it is not stored.
        citizen_data["hashed_password"] = get_password_hash(citizen_data["password"])
        del citizen_data["password"]

        # Optionally, if the email is not provided or empty, assign a default email.
        if "email" not in citizen_data or not citizen_data["email"]:
            citizen_data["email"] = f"{new_id}@panchayat.com"

        # Create new citizen with manually assigned ID
        new_citizen = Citizen(citizen_id=new_id, **citizen_data)
        db.add(new_citizen)
        db.commit()
        db.refresh(new_citizen)

        return new_citizen
    except Exception as e:
        db.rollback()
        raise e
