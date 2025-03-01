from pydantic import BaseModel, Field, field_validator
from typing import Optional


class ChildVaccineQuery(BaseModel):
    vaccine_type: str = Field(
        ...,
        description="Type of vaccine. Allowed values: 'Covid-19', 'Polio', 'HepatitisA', 'HepatitisB', 'Flu', 'Rubella', 'Mumps', 'Small Pox'",
    )
    start_date: Optional[str] = Field(
        "",
        description="Vaccination start date (YYYY-MM-DD), empty means no lower bound",
    )
    end_date: Optional[str] = Field(
        "", description="Vaccination end date (YYYY-MM-DD), empty means no upper bound"
    )
    parent_qualification: str = Field(
        "",
        description="Educational qualification of either parent. Allowed values: 'Illiterate', 'Primary', 'Secondary', 'Higher Secondary', 'Graduate', 'Post Graduate', or empty for no filter",
    )

    @field_validator("vaccine_type")
    def validate_vaccine_type(cls, v):
        allowed_types = {
            "Covid-19",
            "Polio",
            "HepatitisA",
            "HepatitisB",
            "Flu",
            "Rubella",
            "Mumps",
            "Small Pox",
        }
        if v not in allowed_types:
            raise ValueError("Invalid vaccine type")
        return v

    @field_validator("parent_qualification")
    def validate_parent_qualification(cls, v):
        allowed_qualifications = {
            "Illiterate",
            "Primary",
            "Secondary",
            "Higher Secondary",
            "Graduate",
            "Post Graduate",
            "",
        }
        if v not in allowed_qualifications:
            raise ValueError("Invalid parent qualification")
        return v
