from pydantic import BaseModel
from datetime import date
from typing import Optional
from decimal import Decimal


class CitizenCreate(BaseModel):
    name: str
    gender: str
    dob: date
    household_id: int
    educational_qualification: str
    email: Optional[str] = None
    password: str


class CitizenResponse(BaseModel):
    citizen_id: int
    name: str
    gender: str
    dob: date
    household_id: int
    educational_qualification: str
    email: str

    class Config:
        orm_mode = True


class CitizenLogin(BaseModel):
    email: str
    password: str

class CitizenUpdate(BaseModel):
    citizen_id: int
    educational_qualification: Optional[str] = None
    income: Optional[Decimal] = None
    household_id: Optional[int] = None
    password: Optional[str] = None
