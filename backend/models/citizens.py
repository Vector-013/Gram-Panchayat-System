from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey
from database import Base
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import Text, Numeric

##############################
# Households
##############################
class Household(Base):
    __tablename__ = "households"

    household_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    address = Column(Text, nullable=False)

    # One household can have many citizens.
    citizens = relationship(
        "Citizen", back_populates="household", cascade="all, delete"
    )


##############################
# Citizens
##############################
class Citizen(Base):
    __tablename__ = "citizens"

    citizen_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(Text, nullable=False)
    gender = Column(Text, nullable=False)
    dob = Column(Date, nullable=False)
    educational_qualification = Column(Text, nullable=True)
    income = Column(Numeric, nullable=True)
    household_id = Column(Integer, ForeignKey("households.household_id"), nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=True)

    # Relationship to Household.
    household = relationship("Household", back_populates="citizens")

    # Relationships to other tables:
    land_records = relationship(
        "LandRecord", back_populates="citizen", cascade="all, delete"
    )
    panchayat_employee = relationship(
        "PanchayatEmployee", back_populates="citizen", cascade="all, delete"
    )
    scheme_enrollments = relationship(
        "SchemeEnrollment", back_populates="citizen", cascade="all, delete"
    )
    vaccinations = relationship(
        "Vaccination", back_populates="citizen", cascade="all, delete"
    )
    medical_data = relationship(
        "MedicalData", back_populates="citizen", cascade="all, delete"
    )
    taxes = relationship("Tax", back_populates="citizen", cascade="all, delete")
    deaths = relationship("Death", back_populates="citizen", cascade="all, delete")

    # For births and marriage, where a citizen can be in different roles:
    births_as_child = relationship(
        "Birth",
        foreign_keys="Birth.child_id",
        back_populates="child",
        cascade="all, delete",
    )
    births_as_father = relationship(
        "Birth",
        foreign_keys="Birth.father_id",
        back_populates="father",
        cascade="all, delete",
    )
    births_as_mother = relationship(
        "Birth",
        foreign_keys="Birth.mother_id",
        back_populates="mother",
        cascade="all, delete",
    )

    marriage_as_husband = relationship(
        "Marriage",
        foreign_keys="Marriage.husband_id",
        back_populates="husband",
        cascade="all, delete",
    )
    marriage_as_wife = relationship(
        "Marriage",
        foreign_keys="Marriage.wife_id",
        back_populates="wife",
        cascade="all, delete",
    )


##############################
# Land Records
##############################
class LandRecord(Base):
    __tablename__ = "land_records"

    land_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    area_acres = Column(Numeric, nullable=False)
    crop_type = Column(Text, nullable=False)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)

    # Relationship back to Citizen.
    citizen = relationship("Citizen", back_populates="land_records")


##############################
# Panchayat Employees
##############################
class PanchayatEmployee(Base):
    __tablename__ = "panchayat_employees"

    employee_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    role = Column(Text, nullable=False)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)

    citizen = relationship("Citizen", back_populates="panchayat_employee")


##############################
# Assets
##############################
class Asset(Base):
    __tablename__ = "assets"

    asset_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(Text, nullable=False)
    location = Column(Text, nullable=False)
    installation_date = Column(Date, nullable=True)
    value = Column(Numeric, nullable=False)


##############################
# Welfare Schemes
##############################
class WelfareScheme(Base):
    __tablename__ = "welfare_schemes"

    scheme_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)

    # Relationship to enrollments.
    enrollments = relationship(
        "SchemeEnrollment", back_populates="scheme", cascade="all, delete"
    )


##############################
# Scheme Enrollments (Many-to-Many)
##############################
class SchemeEnrollment(Base):
    __tablename__ = "scheme_enrollments"

    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), primary_key=True)
    scheme_id = Column(
        Integer, ForeignKey("welfare_schemes.scheme_id"), primary_key=True
    )
    enrollment_date = Column(Date, nullable=False)

    citizen = relationship("Citizen", back_populates="scheme_enrollments")
    scheme = relationship("WelfareScheme", back_populates="enrollments")


##############################
# Vaccinations
##############################
class Vaccination(Base):
    __tablename__ = "vaccinations"

    vaccination_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)
    vaccination_type = Column(Text, nullable=False)
    date_administered = Column(Date, nullable=False)

    citizen = relationship("Citizen", back_populates="vaccinations")


##############################
# Medical Data
##############################
class MedicalData(Base):
    __tablename__ = "medical_data"

    medical_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)
    health_status = Column(Text, nullable=False)
    medical_condition = Column(Text, nullable=True)

    citizen = relationship("Citizen", back_populates="medical_data")


##############################
# Taxes
##############################
class Tax(Base):
    __tablename__ = "taxes"

    tax_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(Text, nullable=False)
    amount = Column(Numeric, nullable=False)
    payment_status = Column(Text, nullable=False)
    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)
    date = Column(Date, nullable=False)

    citizen = relationship("Citizen", back_populates="taxes")


##############################
# Environmental Data
##############################
class EnvironmentalData(Base):
    __tablename__ = "environmental_data"

    env_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    aqi = Column(Numeric, nullable=False)
    temperature = Column(Numeric, nullable=False)
    humidity = Column(Numeric, nullable=False)
    rainfall = Column(Numeric, nullable=False)
    date_recorded = Column(Date, nullable=False)


##############################
# Geo Features
##############################
class GeoFeature(Base):
    __tablename__ = "geo_features"

    feature_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    feature_type = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    area = Column(Numeric, nullable=False)


##############################
# Marriage
##############################
class Marriage(Base):
    __tablename__ = "marriage"

    husband_id = Column(Integer, ForeignKey("citizens.citizen_id"), primary_key=True)
    wife_id = Column(Integer, ForeignKey("citizens.citizen_id"), primary_key=True)
    marriage_date = Column(Date, nullable=False)

    husband = relationship(
        "Citizen", foreign_keys=[husband_id], back_populates="marriage_as_husband"
    )
    wife = relationship(
        "Citizen", foreign_keys=[wife_id], back_populates="marriage_as_wife"
    )


##############################
# Births
##############################
class Birth(Base):
    __tablename__ = "births"

    child_id = Column(Integer, ForeignKey("citizens.citizen_id"), primary_key=True)
    father_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)
    mother_id = Column(Integer, ForeignKey("citizens.citizen_id"), nullable=True)
    birth_date = Column(Date, nullable=False)

    child = relationship(
        "Citizen", foreign_keys=[child_id], back_populates="births_as_child"
    )
    father = relationship(
        "Citizen", foreign_keys=[father_id], back_populates="births_as_father"
    )
    mother = relationship(
        "Citizen", foreign_keys=[mother_id], back_populates="births_as_mother"
    )


##############################
# Deaths
##############################
class Death(Base):
    __tablename__ = "deaths"

    citizen_id = Column(Integer, ForeignKey("citizens.citizen_id"), primary_key=True)
    date = Column(Date, nullable=False)
    cause = Column(Text, nullable=False)

    citizen = relationship("Citizen", back_populates="deaths")


##############################
# Flora & Fauna
##############################
class FloraFauna(Base):
    __tablename__ = "flora_fauna"

    f_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    habitat = Column(Text, nullable=False)

##############################
# Budget
##############################
class Budget(Base):
    __tablename__ = "budget"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(Text, nullable=False)
    amount = Column(Numeric, nullable=False)
    spent = Column(Numeric, nullable=False)
    created_at = Column(Date, nullable=False)