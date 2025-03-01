from pydantic import BaseModel, Field, field_validator
from typing import Optional

class TaxQuery(BaseModel):
    query_type: str = Field(..., description="Query type; must be 'person' or 'household'")
    id: int = Field(..., description="Citizen ID (for 'person') or Household ID (for 'household')")
    start_date: Optional[str] = Field("", description="Start date (YYYY-MM-DD) or empty to ignore")
    end_date: Optional[str] = Field("", description="End date (YYYY-MM-DD) or empty to ignore")
    min_amount: float = Field(..., description="Minimum tax amount")
    max_amount: float = Field(..., description="Maximum tax amount")

    @field_validator("query_type")
    def validate_query_type(cls, v):
        if v not in {"person", "household"}:
            raise ValueError("query_type must be either 'person' or 'household'")
        return v

    @field_validator("max_amount")
    def validate_max_amount(cls, v, info):
        min_val = info.data.get("min_amount")
        if min_val is not None and v < min_val:
            raise ValueError("max_amount must be greater than or equal to min_amount")
        return v

    @field_validator("start_date", mode="before")
    def normalize_start_date(cls, v: str):
        return v.strip() or None

    @field_validator("end_date", mode="before")
    def normalize_end_date(cls, v: str):
        return v.strip() or None
