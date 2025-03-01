from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from jwt.exceptions import PyJWTError
from fastapi.security import OAuth2PasswordBearer

from schemas.citizens import CitizenLogin
from crud.citizens import get_citizen_by_email
from database import get_db
from utils import (
    verify_password,
    create_access_token,
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)

from sqlalchemy import text

router = APIRouter(prefix="/login", tags=["Login"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# Pre-defined government user credentials and roles.
GOV_USERS = {
    "Admin@panchayat.com": {"password": "OjasMyBoy", "role": "admin"},
    "ITDept@panchayat.com": {"password": "GOVSRules", "role": "it_dept"},
    "CensusDept@panchayat.com": {"password": "GOVSRules", "role": "census_dept"},
    "EduDept@panchayat.com": {"password": "GOVSRules", "role": "edu_dept"},
    "Welfare@panchayat.com": {"password": "GOVSRules", "role": "welfare"},
    "MedDept@panchayat.com": {"password": "GOVSRules", "role": "med_dept"},
}


@router.post("/", response_model=dict)
def login(credentials: CitizenLogin, db: Session = Depends(get_db)):
    try:
        # Check if this is a government user login.
        if credentials.email in GOV_USERS:
            gov_data = GOV_USERS[credentials.email]
            if credentials.password != gov_data["password"]:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid credentials for government user",
                )
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            token = create_access_token(
                data={"sub": credentials.email, "role": gov_data["role"]},
                expires_delta=access_token_expires,
            )
            return {
                "access_token": token,
                "token_type": "bearer",
                "role": gov_data["role"],
            }

        # Authenticate as a citizen.
        user = get_citizen_by_email(db, credentials.email)
        if not user or not verify_password(credentials.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )

        # Determine user role
        role = "citizen"
        erole = "citizen"
        eid = -1
        if user.citizen_id == 1:
            erole = "pradhan"
            role = "pradhan"
            sql = text(
                "SELECT employee_id FROM panchayat_employees WHERE employee_id = :citizen_id"
            )
            eid = db.execute(sql, {"citizen_id": user.citizen_id}).scalar()
        else:
            # Check if user is in employees table
            try:
                print(user.citizen_id)
                sql = text(
                    "SELECT EXISTS(SELECT 1 FROM panchayat_employees e WHERE e.citizen_id = :citizen_id)"
                )
                try:
                    is_employee = db.execute(
                        sql, {"citizen_id": user.citizen_id}
                    ).scalar()
                except Exception as e:
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail="Database error while checking employment sstatus.",
                    ) from e
                if is_employee:
                    role = "employee"
                    sql = text(
                        """SELECT e.role, e.employee_id FROM panchayat_employees e WHERE e.citizen_id = :citizen_id;"""
                    )
                    erole, eid = db.execute(
                        sql, {"citizen_id": user.citizen_id}
                    ).fetchone()
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Database error while checking employment status.",
                ) from e

        # Generate token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(
            data={"sub": user.email, "role": role},
            expires_delta=access_token_expires,
        )

        # Fetch household address safely
        try:
            sql = text(
                "SELECT address FROM households WHERE household_id = :household_id"
            )
            address = db.execute(sql, {"household_id": user.household_id}).scalar()
            if address is None:
                address = "Unknown"
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error fetching household address.",
            ) from e

        return {
            "access_token": token,
            "token_type": "bearer",
            "role": role,
            "erole": erole,
            "eid": eid,
            "id": user.citizen_id,
            "name": user.name,
            "gender": user.gender,
            "dob": user.dob,
            "educational_qualification": user.educational_qualification,
            "income": user.income,
            "address": address,
            "household_id": user.household_id,
            "email": user.email,
        }

    except HTTPException as e:
        raise e  # Pass through HTTPExceptions

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login.",
        ) from e
