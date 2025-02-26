from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.citizens import CitizenCreate, CitizenResponse
from crud.citizens import create_citizen, get_citizens, get_citizen_by_id

router = APIRouter(prefix="/citizens", tags=["Citizens"])


@router.get("/", response_model=list[CitizenResponse])
def read_citizens(db: Session = Depends(get_db)):
    citizens = get_citizens(db)
    return citizens


@router.get("/{citizen_id}", response_model=CitizenResponse)
def read_citizen(citizen_id: int, db: Session = Depends(get_db)):
    citizen = get_citizen_by_id(db, citizen_id)
    if not citizen:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Citizen not found"
        )
    return citizen


@router.post("/", response_model=CitizenResponse)
def create_new_citizen(citizen: CitizenCreate, db: Session = Depends(get_db)):

    print("[INFO]: Received request to create new citizen")
    new_citizen = create_citizen(db, citizen)

    ## print citizen details
    print(f"[INFO]: New citizen created with ID: {new_citizen.citizen_id}")
    print(f"[INFO]: Name: {new_citizen.name}")
    print(f"[INFO]: Name: {new_citizen}")

    return new_citizen
