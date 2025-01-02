

import os
from dotenv import load_dotenv
import requests
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.auth import verify_token
from app.database import SessionLocal, QAHistory
from app.models import QuestionRequest, HistoryResponse
from app.database import User
from app.crud import create_user, authenticate_user
from pydantic import BaseModel
from sqlalchemy import desc

# Load environment variables from the .env file
load_dotenv()

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Define the user registration model
class UserRegistration(BaseModel):
    username: str
    password: str

# Dependency to get current authenticated user
def get_current_user(token: str = Depends(oauth2_scheme)):
    user = verify_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user

@router.post("/register")
def register(user: UserRegistration, db: Session = Depends(get_db)):
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Registration logic here, save user to the database
    user = create_user(db=db, username=user.username, password=user.password)
    return {"message": "User created successfully", "username": user.username}


# Endpoint for user login
@router.post("/login")
def login(request: UserRegistration):
    token = authenticate_user(request.username, request.password)
    if token:
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/ask")
async def ask(question_request: QuestionRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    question = question_request.question
    if not question or len(question) > 200:
        raise HTTPException(status_code=400, detail="Invalid question.")
    
    # Fetch the gemini API key from the .env file
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        raise HTTPException(status_code=500, detail="Gemini API key not found in environment variables.")
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
    payload = {
        "contents": [{"parts": [{"text": question}]}]
    }
    
    try:
        # Send request to Gemini API
        response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
        
        if response.status_code == 200:
            response_data = response.json()
            candidates = response_data.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                if "parts" in content:
                    answer = content["parts"][0].get("text", "Could not generate an answer.")
                else:
                    answer = "No parts found in the response."
            else:
                answer = "No candidates found in the response."
        else:
            answer = f"Error occurred while calling the Gemini API: {response.status_code}"

    except Exception as e:
        answer = f"Error occurred while processing the request: {str(e)}"
    
    # Log the question and answer to the database, associated with the current user's username
    new_entry = QAHistory(question=question, answer=answer, username=current_user.username)  # Change user_id to username
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    
    return {"answer": answer}


@router.get("/history")
async def history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), page: int = 1, limit: int = 30):
    offset = (page - 1) * limit
    # Query history for the logged-in user using the username instead of user_id
    query = db.query(QAHistory).filter(QAHistory.username == current_user.username).order_by(desc(QAHistory.timestamp)).offset(offset).limit(limit).all()
    return query


@router.get("/health")
async def health_check():
    return {"status": "healthy"}
