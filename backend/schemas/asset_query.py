from pydantic import BaseModel, Field, field_validator
from typing import Optional


class AssetQuery(BaseModel):
    type: str = Field(
        ...,
        description="Asset type; must be one of: 'Street Light', 'Road', 'Library', 'Water Pump', 'School', 'Public Toilet', or an empty string to ignore this filter",
    )
    value_min: float = Field(..., description="Minimum asset value")
    value_max: float = Field(..., description="Maximum asset value")
    location: str = Field(
        ...,
        description="Location filter; allowed values: 'Main Bazaar, Phulera', 'Gandhi Chowk, Phulera', 'Subhash Marg, Phulera', 'Rajput Mohalla, Phulera', 'Station Road, Phulera', or an empty string to ignore this filter",
    )

    @field_validator("type")
    def validate_type(cls, v):
        allowed = {
            "Street Light",
            "Road",
            "Library",
            "Water Pump",
            "School",
            "Public Toilet",
            "",
        }
        if v not in allowed:
            raise ValueError(
                "Invalid asset type. Must be one of: 'Street Light', 'Road', 'Library', 'Water Pump', 'School', 'Public Toilet', or empty."
            )
        return v

    @field_validator("value_max")
    def validate_value_max(cls, v, info):
        min_val = info.data.get("value_min")
        if min_val is not None and v < min_val:
            raise ValueError("value_max must be greater than or equal to value_min")
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
            raise ValueError(
                "Invalid location. Allowed values are: 'Main Bazaar, Phulera', 'Gandhi Chowk, Phulera', 'Subhash Marg, Phulera', 'Rajput Mohalla, Phulera', 'Station Road, Phulera', or empty."
            )
        return v
