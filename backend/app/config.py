import os

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))