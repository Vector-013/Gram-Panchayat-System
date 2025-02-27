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

router = APIRouter(prefix="/login", tags=["Login"])

ADMIN_USERNAME = "Admin@panchayat.com"
ADMIN_PASSWORD = "OjasMyBoy"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


@router.post("/", response_model=dict)
def login(credentials: CitizenLogin, db: Session = Depends(get_db)):
    # Check if this is an admin login
    if credentials.email == ADMIN_USERNAME:
        if credentials.password == ADMIN_PASSWORD:
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            token = create_access_token(
                data={"sub": ADMIN_USERNAME, "role": "admin"},
                expires_delta=access_token_expires,
            )
            return {"access_token": token, "token_type": "bearer", "role": "admin"}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin credentials",
            )
    # Otherwise, authenticate as a citizen
    user = get_citizen_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.email, "role": "citizen"}, expires_delta=access_token_expires
    )
    return {"access_token": token, "token_type": "bearer", "role": "citizen"}


@router.post("/logout", response_model=dict)
def logout(token: str = Depends(oauth2_scheme)):
    # In JWT systems, logout is handled client-side (by deleting the token).
    # Optionally, implement token blacklisting.
    return {"message": "Successfully logged out"}
