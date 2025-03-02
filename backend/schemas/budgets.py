from pydantic import BaseModel, Field

from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class AssetCreate(BaseModel):
    type: str = Field(
        ...,
        description="Asset type. Allowed values: 'Street Light', 'School', 'Road', 'Library', 'Public Toilet', 'Hospital', 'Water Pump', 'Well'",
    )
    location: str = Field(
        ...,
        description="Asset location. Allowed values: 'Main Bazaar, Phulera', 'Gandhi Chowk, Phulera', 'Subhash Marg, Phulera', 'Rajput Mohalla, Phulera', 'Station Road, Phulera'",
    )
    installation_date: Optional[str] = Field(
        "", description="Installation date in YYYY-MM-DD; empty means not provided"
    )
    value: Decimal = Field(..., description="Asset value")


class BudgetCreate(BaseModel):
    category: str = Field(
        ...,
        description="Category of the budget. Allowed values: 'Public Coomodities', 'Children', 'Health', 'Sanitation'",
    )
    amount: float = Field(..., description="Amount to be allocated")
