from sqlalchemy import Column, Integer, String, Date
from database import Base


class Citizen(Base):
    __tablename__ = "citizens"

    citizen_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    household_id = Column(Integer, nullable=False)
    educational_qualification = Column(String, nullable=False)
