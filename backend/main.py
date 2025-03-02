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
    vaccines,
    environment,
    geo,
    assets,
    esg,
    vaccination_query,
    posts,
    birth_event,
    citizen_creator,
    tax_update,
    medical_condition,
    mgnrega,
    asset_management,
    update_citizen,
    create_environment,
    medical_post,
    census_env,
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
app.include_router(vaccines)
app.include_router(environment)
app.include_router(geo)
app.include_router(assets)
app.include_router(esg)
app.include_router(vaccination_query)
app.include_router(posts)
app.include_router(birth_event)
app.include_router(citizen_creator)
app.include_router(tax_update)
app.include_router(medical_condition)
app.include_router(mgnrega)
app.include_router(asset_management)
app.include_router(update_citizen)
app.include_router(create_environment)
app.include_router(medical_post)
app.include_router(census_env)

# Start server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
