from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text
from app.database import Base
from sqlalchemy.orm import relationship



history = relationship("QAHistory", back_populates="user") 

class QuestionRequest(BaseModel):
    question: str

class HistoryResponse(BaseModel):
    question: str
    answer: str
