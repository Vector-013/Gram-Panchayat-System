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
    # Check if this is a government user login.
    if credentials.email in GOV_USERS:
        gov_data = GOV_USERS[credentials.email]
        print(gov_data)
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
        return {"access_token": token, "token_type": "bearer", "role": gov_data["role"]}

    # Otherwise, authenticate as a citizen.
    user = get_citizen_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.email, "role": "citizen"},
        expires_delta=access_token_expires,
    )
    print(user.citizen_id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "citizen",
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


@router.post("/logout", response_model=dict)
def logout(token: str = Depends(oauth2_scheme)):
    # For JWT, logout is typically handled on the client-side by removing the token.
    # Optionally, token blacklisting can be implemented server-side.
    return {"message": "Successfully logged out"}
