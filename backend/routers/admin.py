from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import jwt
from jwt.exceptions import PyJWTError


from schemas.citizens import CitizenCreate, CitizenResponse
from crud.citizens import create_citizen, get_citizen_by_email
from database import get_db
from utils import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/admin", tags=["Admin"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def get_current_admin(token: str = Depends(oauth2_scheme)):
    """
    Dependency that decodes the JWT token and checks if the user has an 'admin' role.
    Raises an HTTPException if the token is invalid or if the role is not 'admin'.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        if username is None or role != "admin":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized as admin",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return username
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post("/register", response_model=CitizenResponse)
def register_citizen(
    citizen: CitizenCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    """
    Admin-only endpoint to register a new citizen.
    The get_current_admin dependency ensures only an admin token can access this endpoint.
    """
    # if get_citizen_by_email(db, citizen.email):
    #     raise HTTPException(status_code=400, detail="Email already registered")
    new_citizen = create_citizen(db, citizen)
    return new_citizen
