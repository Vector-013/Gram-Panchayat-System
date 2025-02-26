from sqlalchemy import Column, Integer, String, Date
from database import Base


class Citizen(Base):
    __tablename__ = "citizens"

    citizen_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    household_id = Column(Integer, ForeignKey("households.household_id"), nullable=False)
    educational_qualification = Column(String, nullable=False)

    # Relationship to Household
    household = relationship("Household", back_populates="citizens")
    tax = relationship("Tax", back_populates="citizens", cascade="all, delete")
    medical_data = relationship("MedicalData", back_populates="citizens", cascade="all, delete")
    land_records = relationship("LandRecord", back_populates="citizens", cascade="all, delete")
    vaccinations = relationship("Vaccination", back_populates="citizens", cascade="all, delete")

class Household(Base):
    __tablename__ = "households"

    household_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    address = Column(String, nullable=False)

    # Relationship to Citizen
    citizens = relationship("Citizen", back_populates="households", cascade="all, delete")

class Tax(Base):
    __tablename__ = "taxes"

    tax_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=False)
    tax_amount = Column(Integer, nullable=False)
    payment_status = Column(String, nullable=False)

    # Relationship to Household
    citizen = relationship("Citizen", back_populates="taxes")

class MedicalData(Base):
    __tablename__ = "medical_data"

    medical_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=False)
    health_status = Column(String, nullable=False)
    medical_condition = Column(String, nullable=False)

    # Relationship to Citizen
    citizen = relationship("Citizen", back_populates="medical_data")

class LandRecord(Base):
    __tablename__ = "land_records"

    land_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=False)
    area_acres = Column(Integer, nullable=False)
    crop_type = Column(String, nullable=False)

    # Relationship to Citizen
    citizen = relationship("Citizen", back_populates="land_records")

class Vaccination(Base):
    __tablename__ = "vaccinations"

    vaccination_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=False)
    vaccine_type = Column(String, nullable=False)
    date_administered = Column(Date, nullable=False)

    # Relationship to Citizen
    citizen = relationship("Citizen", back_populates="vaccinations")