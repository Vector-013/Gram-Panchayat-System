from pydantic import BaseModel
from datetime import date


class CitizenCreate(BaseModel):
    name: str
    gender: str
    dob: date
    household_id: int
    educational_qualification: str


class CitizenResponse(BaseModel):
    citizen_id: int
    name: str
    gender: str
    dob: date
    household_id: int
    educational_qualification: str

    class Config:
        orm_mode = True
