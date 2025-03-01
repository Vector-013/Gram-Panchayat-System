from pydantic import BaseModel, Field
from datetime import date
from typing import Optional


class CitizenCreator(BaseModel):
    name: str = Field(..., description="Citizen's full name")
    gender: str = Field(..., description="Citizen's gender")
    dob: date = Field(..., description="Date of birth (YYYY-MM-DD)")
    educational_qualification: Optional[str] = Field(
        "", description="Educational qualification"
    )
    income: Optional[float] = Field(0, description="Personal income")
    household_id: int = Field(..., description="Household ID")
    password: str = Field(..., description="Plain text password")
