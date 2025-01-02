from app.database import User
from app.database import SessionLocal
from app.auth import create_access_token
from passlib.context import CryptContext
from sqlalchemy.orm import Session
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create User
def create_user(db:Session ,username: str, password: str):
    
    hashed_password = pwd_context.hash(password)
    db_user = User(username=username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()
    return db_user

# Authenticate User and return a JWT token
def authenticate_user(username: str, password: str):
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    db.close()
    if user and pwd_context.verify(password, user.password):
        return create_access_token(data={"user_id": user.id})
    return None

def get_user(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    db.close()
    return user

