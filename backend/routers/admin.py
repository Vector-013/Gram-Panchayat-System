from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import jwt
from jwt.exceptions import PyJWTError


from schemas.citizens import CitizenCreate, CitizenResponse
from crud.citizens import create_citizen, get_citizen_by_email
from database import get_db
from utils import SECRET_KEY, ALGORITHM
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text
from datetime import date
from routers.posts.dependencies import get_current_user
from schemas.budgets import BudgetCreate

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


@router.post("/allocate-budget", response_model=dict)
def allocate_budget(
    budget_data: BudgetCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    # Only admins can allocate budget
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can allocate budget.",
        )

    if budget_data.category not in {
        "Roads",
        "Education",
        "Healthcare",
        "Water Supply" "Miscellaneous",
        "Women Empowerment",
    }:
        raise HTTPException(status_code=400, detail="Invalid category")

    try:
        sql = text(
            """
            INSERT INTO budget (category, amount, spent, created_at)
            VALUES (:category, :amount, 0, :created_at)
            RETURNING budget_id, category, amount, spent, created_at;
        """
        )
        params = {
            "category": budget_data.category,
            "amount": budget_data.amount,
            "created_at": date.today(),
        }
        result = db.execute(sql, params)
        db.commit()
        record = result.fetchone()
        if not record:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Budget allocation failed",
            )
        return {
            "budget_id": record.budget_id,
            "category": record.category,
            "amount": record.amount,
            "spent": record.spent,
            "created_at": record.created_at.isoformat(),
        }
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )
