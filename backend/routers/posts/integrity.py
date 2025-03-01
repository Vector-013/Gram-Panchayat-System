from pydantic import BaseModel, Field, field_validator
from decimal import Decimal
from typing import Optional


class HouseholdCreate(BaseModel):
    address: str


class LandRecordCreate(BaseModel):
    area_acres: Decimal
    crop_type: str
    weight: Decimal
    year_recorded: int
    citizen_id: int


class PanchayatEmployeeCreate(BaseModel):
    role: str = Field(
        ...,
        description="Role of the employee; allowed values: Member, Secretary, Clerk, Treasurer, Accountant, Engineer",
    )
    citizen_id: int = Field(
        ..., description="The citizen ID corresponding to the employee"
    )

    @field_validator("role")
    def validate_role(cls, v):
        allowed = {
            "Member",
            "Secretary",
            "Clerk",
            "Treasurer",
            "Accountant",
            "Engineer",
        }
        if v not in allowed:
            raise ValueError("Role must be one of: " + ", ".join(sorted(allowed)))
        return v


class AssetCreate(BaseModel):
    type: str = Field(
        ...,
        description="Asset type; allowed values: 'Street Light', 'School', 'Road', 'Library', 'Public Toilet', 'Hospital', 'Water Pump', 'Well'",
    )
    location: str = Field(..., description="Asset location")
    installation_date: Optional[str] = Field(
        "",
        description="Installation date in YYYY-MM-DD format, empty string means not provided",
    )
    value: Decimal = Field(..., description="Asset value")

    @field_validator("type")
    def validate_type(cls, v):
        allowed = {
            "Street Light",
            "School",
            "Road",
            "Library",
            "Public Toilet",
            "Hospital",
            "Water Pump",
            "Well",
        }
        if v not in allowed:
            raise ValueError(
                "Invalid asset type. Allowed values are: " + ", ".join(sorted(allowed))
            )
        return v
