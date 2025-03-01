from pydantic import BaseModel, Field
from datetime import date

class BirthEvent(BaseModel):
    mother_id: int = Field(..., description="Mother's citizen ID")
    father_id: int = Field(..., description="Father's citizen ID")
    baby_name: str = Field(..., description="Name of the baby")
    gender: str = Field(..., description="Baby's gender (Male/Female/Other)")
    password: str = Field(..., description="Password for the baby account")
