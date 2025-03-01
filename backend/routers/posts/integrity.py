from pydantic import BaseModel
from decimal import Decimal


class HouseholdCreate(BaseModel):
    address: str


class LandRecordCreate(BaseModel):
    area_acres: Decimal
    crop_type: str
    weight: Decimal
    year_recorded: int
    citizen_id: int
