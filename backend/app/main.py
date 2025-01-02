from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:5173",  # Add your frontend URL here
    # Add any other trusted origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the listed origins to access the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(api_router, prefix="/api")
