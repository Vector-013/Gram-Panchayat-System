from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from database import get_db
from .dependencies import get_current_user
from pydantic import BaseModel
from decimal import Decimal
from .integrity import (
    HouseholdCreate,
    LandRecordCreate,
    PanchayatEmployeeCreate,
    AssetCreate,
    WelfareSchemeCreate,
    WelfareSchemeResponse,
)

router = APIRouter()


@router.post("/households/", response_model=dict)
def create_household(
    household: HouseholdCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Ensure only employees or pradhan can create households
    if user["role"] not in {"employee", "pradhan"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a household",
        )

    try:
        sql = text(
            """
            INSERT INTO households (address)
            VALUES (:address)
            RETURNING household_id, address
        """
        )
        result = db.execute(sql, {"address": household.address}).fetchone()
        db.commit()

        if result:
            return {"household_id": result.household_id, "address": result.address}
        else:
            raise HTTPException(status_code=500, detail="Household creation failed")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("/land-records/", response_model=dict)
def create_land_record(
    land_data: LandRecordCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    # Only employees or pradhan can create land records
    if user["role"] not in ["employee", "pradhan"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Insert into land_records table

    try:
        sql = text(
            """
            INSERT INTO land_records (area_acres, weight, crop_type, year_recorded, citizen_id)
            VALUES (:area_acres, :weight, :crop_type, :year_recorded, :citizen_id)
            RETURNING land_id
        """
        )
        result = db.execute(
            sql,
            {
                "area_acres": land_data.area_acres,
                "weight": land_data.weight,
                "crop_type": land_data.crop_type,
                "year_recorded": land_data.year_recorded,
                "citizen_id": land_data.citizen_id,
            },
        ).fetchone()
        db.commit()

        land_id = result.land_id

        if result:

            return {"message": "Land record added successfully", "land_id": land_id}

        else:
            raise HTTPException(status_code=500, detail="Land record creation failed")

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("/employee-create", response_model=dict)
def create_panchayat_employee(
    employee: PanchayatEmployeeCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    # Only users with role 'pradhan' or 'employee' can create PanchayatEmployee records.
    if current_user["role"] not in {"pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a Panchayat Employee record.",
        )

    try:
        sql = text(
            """
            INSERT INTO panchayat_employees (role, citizen_id)
            VALUES (:role, :citizen_id)
            RETURNING employee_id, role, citizen_id
        """
        )
        result = db.execute(
            sql, {"role": employee.role, "citizen_id": employee.citizen_id}
        )
        new_employee = result.fetchone()
        db.commit()

        if new_employee is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Panchayat employee creation failed",
            )

        return {
            "employee_id": new_employee.employee_id,
            "role": new_employee.role,
            "citizen_id": new_employee.citizen_id,
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@router.post("/asset-create", response_model=dict)
def create_asset(
    asset: AssetCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Only allow pradhan or employee roles to create asset records
    if user["role"] not in {"pradhan", "employee"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create assets.",
        )

    try:
        sql = text(
            """
            INSERT INTO assets (type, location, installation_date, value)
            VALUES (:type, :location, :installation_date, :value)
            RETURNING asset_id, type, location, 
                      to_char(installation_date, 'YYYY-MM-DD') as installation_date, 
                      value
        """
        )

        params = {
            "type": asset.type,
            "location": asset.location,
            "installation_date": (
                asset.installation_date
                if asset.installation_date.strip() != ""
                else None
            ),
            "value": asset.value,
        }

        result = db.execute(sql, params)
        new_asset = result.fetchone()
        db.commit()

        if not new_asset:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Asset creation failed",
            )

        return {
            "asset_id": new_asset.asset_id,
            "type": new_asset.type,
            "location": new_asset.location,
            "installation_date": new_asset.installation_date,
            "value": float(new_asset.value),
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


ALLOWED_ROLES = {"pradhan", "employee"}


@router.post("/welfare-schemes", response_model=WelfareSchemeResponse)
def create_welfare_scheme(
    scheme: WelfareSchemeCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    # Only allow pradhan or employee to create welfare schemes.
    if current_user["role"] not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a welfare scheme.",
        )
    try:
        sql = text(
            """
            INSERT INTO welfare_schemes (name, description)
            VALUES (:name, :description)
            RETURNING scheme_id, name, description
        """
        )
        result = db.execute(
            sql, {"name": scheme.name, "description": scheme.description}
        ).fetchone()
        db.commit()
        if not result:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Welfare scheme creation failed",
            )
        return WelfareSchemeResponse(
            scheme_id=result.scheme_id, name=result.name, description=result.description
        )
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@router.get("/welfare-schemes", response_model=dict)
def list_welfare_schemes(
    db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)
):
    # Only allow pradhan or employee to view welfare schemes.
    if current_user["role"] not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to view welfare schemes.",
        )
    try:
        sql = text(
            """
            SELECT scheme_id, name, description
            FROM welfare_schemes
            ORDER BY scheme_id
        """
        )
        result = db.execute(sql)
        rows = result.fetchall()
        schemes = [
            {
                "scheme_id": row.scheme_id,
                "name": row.name,
                "description": row.description,
            }
            for row in rows
        ]
        return {"schemes": schemes}
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


from pydantic import BaseModel, Field, field_validator
from decimal import Decimal


class GeoFeatureCreate(BaseModel):
    feature_type: str = Field(
        ...,
        description="Type of geo feature. Allowed values: 'Forest', 'Desert', 'River', 'Lake', 'Mountain'",
    )
    name: str = Field(..., description="Name of the geo feature")
    area: Decimal = Field(..., description="Area of the geo feature")

    @field_validator("feature_type")
    def validate_feature_type(cls, value):
        allowed = {"Forest", "Desert", "River", "Lake", "Mountain"}
        if value not in allowed:
            raise ValueError(
                f"Invalid feature type. Allowed values: {', '.join(sorted(allowed))}"
            )
        return value


@router.post("/geo-features", response_model=dict)
def create_geo_feature(
    feature: GeoFeatureCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):

    if user["role"] not in {"pradhan", "employee", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a geo feature",
        )

    sql = text(
        """
        INSERT INTO geo_features (feature_type, name, area)
        VALUES (:feature_type, :name, :area)
        RETURNING feature_id, feature_type, name, area;
    """
    )
    params = {
        "feature_type": feature.feature_type,
        "name": feature.name,
        "area": feature.area,
    }
    try:
        result = db.execute(sql, params)
        db.commit()
        new_feature = result.fetchone()
        if not new_feature:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Geo feature creation failed",
            )
        return dict(new_feature._mapping)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
