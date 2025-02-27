from pydantic import BaseModel
from datetime import date
from typing import Optional


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
