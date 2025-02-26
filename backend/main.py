from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from routers import citizens  # Import router

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
app.include_router(citizens.router)  # Move citizen APIs to `routers/citizen.py`

# Start server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
