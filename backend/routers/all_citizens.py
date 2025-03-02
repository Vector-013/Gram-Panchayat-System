from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from database import get_db
from routers.posts.dependencies import get_current_user

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/all-citizens", response_model=dict)
def get_all_citizens(
    db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)
):
    # Optionally, restrict this endpoint by checking current_user role.
    # For example:
    if current_user["role"] not in {"admin", "employee", "pradhan"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view citizens.")

    sql = text(
        """
        SELECT 
            citizen_id,
            name,
            gender,
            dob,
            educational_qualification,
            income,
            household_id,
            email
        FROM citizens
        ORDER BY citizen_id;
    """
    )
    try:
        result = db.execute(sql)
        rows = result.fetchall()
        citizens = [dict(row._mapping) for row in rows]
        return {"citizens": citizens}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
