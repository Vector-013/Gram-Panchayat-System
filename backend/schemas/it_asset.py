from pydantic import BaseModel, Field, field_validator
from typing import Optional


class ITAssetQuery(BaseModel):
    asset_type: str = Field(
        ...,
        description="Asset type; allowed values: 'Street Light', 'School', 'Road', 'Library', 'Public Toilet', 'Hospital', 'Water Pump', 'Well', or empty string to ignore",
    )
    location: str = Field(
        ...,
        description="Location; allowed values: 'Main Bazaar, Phulera', 'Gandhi Chowk, Phulera', 'Subhash Marg, Phulera', 'Rajput Mohalla, Phulera', 'Station Road, Phulera', or empty string to ignore",
    )
    value_min: float = Field(..., description="Minimum asset value")
    value_max: float = Field(..., description="Maximum asset value")
    start_date: Optional[str] = Field(
        "", description="Installation start date (YYYY-MM-DD) or empty to ignore"
    )
    end_date: Optional[str] = Field(
        "", description="Installation end date (YYYY-MM-DD) or empty to ignore"
    )

    @field_validator("asset_type")
    def validate_asset_type(cls, v):
        allowed = {
            "Street Light",
            "School",
            "Road",
            "Library",
            "Public Toilet",
            "Hospital",
            "Water Pump",
            "Well",
            "",
        }
        if v not in allowed:
            raise ValueError("Invalid asset type")
        return v

    @field_validator("location")
    def validate_location(cls, v):
        allowed = {
            "Main Bazaar, Phulera",
            "Gandhi Chowk, Phulera",
            "Subhash Marg, Phulera",
            "Rajput Mohalla, Phulera",
            "Station Road, Phulera",
            "",
        }
        if v not in allowed:
            raise ValueError("Invalid location")
        return v

    @field_validator("value_max")
    def validate_value_max(cls, v, info):
        min_val = info.data.get("value_min")
        if min_val is not None and v < min_val:
            raise ValueError("value_max must be greater than or equal to value_min")
        return v

    @field_validator("start_date", mode="before")
    def normalize_start_date(cls, v: str):
        return v.strip() or None

    @field_validator("end_date", mode="before")
    def normalize_end_date(cls, v: str):
        return v.strip() or None
