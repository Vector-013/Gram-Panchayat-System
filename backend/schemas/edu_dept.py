from pydantic import BaseModel, Field, field_validator
from typing import Optional


class EduDeptQuery(BaseModel):
    gender: str = Field(..., description="Must be one of: Male, Female, or Other")
    educational_level: str = Field(
        ...,
        description="One of: Primary, Secondary, Higher Secondary, Graduate, or Post Graduate",
    )
    dob_min: str = Field(..., description="Lower bound for date of birth (YYYY-MM-DD)")
    dob_max: str = Field(..., description="Upper bound for date of birth (YYYY-MM-DD)")
    income_min: float = Field(..., description="Minimum household income")
    income_max: float = Field(..., description="Maximum household income")

    @field_validator("gender")
    def validate_gender(cls, v):
        allowed = {"Male", "Female", "Other", "All"}
        if v not in allowed:
            raise ValueError("gender must be one of: Male, Female, Other, All")
        return v

    @field_validator("educational_level")
    def validate_educational_level(cls, v):
        allowed = {
            "Illiterate",
            "Primary",
            "Secondary",
            "Higher Secondary",
            "Graduate",
            "Post Graduate",
            "All",
        }
        if v not in allowed:
            raise ValueError(
                "educational_level must be one of: Primary, Secondary, Higher Secondary, Graduate, or Post Graduate"
            )
        return v

    @field_validator("income_max")
    def validate_income_max(cls, v, info):
        lower = info.data.get("income_min")
        if lower is not None and v < lower:
            raise ValueError("income_max must be greater than or equal to income_min")
        return v


class EduDeptResult(BaseModel):
    citizen_id: int
    name: str
    gender: str
    dob: str
    educational_level: str
    total_income: float

    model_config = {"from_attributes": True}


from pydantic import BaseModel, Field, field_validator


class SingleGirlQuery(BaseModel):
    min_household_income: float = Field(..., description="Minimum household income")
    max_household_income: float = Field(..., description="Maximum household income")
    min_age: int = Field(..., description="Minimum age")
    max_age: int = Field(..., description="Maximum age")

    @field_validator("max_household_income")
    def validate_household_income(cls, v, info):
        min_val = info.data.get("min_household_income")
        if min_val is not None and v < min_val:
            raise ValueError(
                "max_household_income must be greater than or equal to min_household_income"
            )
        return v

    @field_validator("max_age")
    def validate_age(cls, v, info):
        min_val = info.data.get("min_age")
        if min_val is not None and v < min_val:
            raise ValueError("max_age must be greater than or equal to min_age")
        return v
