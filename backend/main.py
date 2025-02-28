from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import (
    citizens,
    admin,
    login,
    it_dept,
    edu_dept,
    family_data,
    land_records,
    it_analytics,
    medical_data,
    taxes,
)

app = FastAPI()

# CORS Setup
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, Gram Panchayat System!"}


# Include API routers
app.include_router(citizens)
app.include_router(admin)
app.include_router(login)
app.include_router(it_dept)
app.include_router(edu_dept)
app.include_router(family_data)
app.include_router(land_records)
app.include_router(it_analytics)
app.include_router(medical_data)
app.include_router(taxes)

# Start server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
