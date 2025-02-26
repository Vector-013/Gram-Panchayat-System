from sqlalchemy.orm import Session
from models.citizens import Citizen
from schemas.citizens import CitizenCreate
from sqlalchemy.sql import text


def get_citizens(db: Session):
    return db.query(Citizen).all()


def get_citizen_by_id(db: Session, citizen_id: int):
    return db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()


def create_citizen(db: Session, citizen: CitizenCreate):

    try:
        # Find max citizen_id and increment

        max_id_query = text("SELECT COALESCE(MAX(citizen_id), 0) FROM citizens")
        max_id = db.execute(max_id_query).scalar()
        new_id = max_id + 1

        print(f"[INFO]: New citizen ID: {new_id}")

        # Create new citizen with manually assigned ID
        new_citizen = Citizen(citizen_id=new_id, **citizen.model_dump())
        db.add(new_citizen)
        db.commit()
        db.refresh(new_citizen)

        ## query database by the name of the citizen
        try:
            query = text("SELECT * FROM citizens WHERE name = :name")
            result = db.execute(query, {"name": citizen.name}).fetchall()
            print(f"[INFO]: Query result: {result}")
        except Exception as e:
            print(f"[ERROR]: {e}")
            db.rollback()

        return new_citizen
    except Exception as e:
        db.rollback()
        raise e
