from pydantic import BaseModel
from typing import List, Optional


class FamilyMember(BaseModel):
    citizen_id: int
    name: str
    gender: str
    income: float
    educational_qualification: Optional[str]
    dob: str  # ISO formatted date string
    age: int


class FamilyDataResponse(BaseModel):
    family_members: List[FamilyMember]
    total_family_income: float
    closest_birthday: Optional[str]

    model_config = {"from_attributes": True}
