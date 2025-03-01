from pydantic import BaseModel, Field, field_validator
from typing import Optional


class IncomeQuery(BaseModel):
    income_min: float = Field(..., description="Minimum personal income")
    income_max: float = Field(..., description="Maximum personal income")
    household_income_min: float = Field(..., description="Minimum household income")
    household_income_max: float = Field(..., description="Maximum household income")
    gender: Optional[str] = Field(
        "", description="Gender filter (Male/Female/Other or empty for all)"
    )
    age_min: int = Field(..., description="Minimum age")
    age_max: Optional[int] = Field(None, description="Maximum age")
    educational_qualification: Optional[str] = Field(
        "", description="Education qualification filter (or empty for all)"
    )

    @field_validator("income_max")
    def validate_income_max(cls, v, info):
        min_val = info.data.get("income_min")
        if v < min_val:
            raise ValueError("income_max must be greater than or equal to income_min")
        return v

    @field_validator("household_income_max")
    def validate_household_income_max(cls, v, info):
        min_val = info.data.get("household_income_min")
        if v < min_val:
            raise ValueError(
                "household_income_max must be greater than or equal to household_income_min"
            )
        return v

    @field_validator("age_max", mode="before")
    def normalize_age_max(cls, v):
        return v if v else None  # Allow open-ended age range
