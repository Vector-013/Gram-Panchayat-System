from pydantic import BaseModel, Field, field_validator
from typing import Optional


class LandQuery(BaseModel):
    role: str = Field(..., description="Role: 'citizen' or 'panchayat'")
    lower_limit: float = Field(..., description="Lower limit of total land area owned")
    upper_limit: float = Field(..., description="Upper limit of total land area owned")
    crop_type: Optional[str] = Field(None, description="Crop type (optional)")

    @field_validator("role")
    def validate_role(cls, v):
        allowed = {"citizen", "panchayat"}
        if v not in allowed:
            raise ValueError("role must be either 'citizen' or 'panchayat'")
        return v

    @field_validator("upper_limit")
    def validate_limits(cls, v, info):
        lower = info.data.get("lower_limit")
        if lower is not None and v < lower:
            raise ValueError("upper_limit must be greater than or equal to lower_limit")
        return v


class LandQueryResult(BaseModel):
    citizen_id: int
    name: str
    total_area: float
    address: str
    age: int
    income: Optional[float] = None

    model_config = {"from_attributes": True}
