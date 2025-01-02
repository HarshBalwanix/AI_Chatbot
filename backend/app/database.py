from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey ,DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship
from datetime import datetime

DATABASE_URL = "sqlite:///./app.db"
Base = declarative_base()
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
  
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password = Column(String, nullable=False)

    history = relationship("QAHistory", back_populates="user")  # Relationship between User and QAHistory


class QAHistory(Base):
    __tablename__ = "qa_history"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50),  ForeignKey("users.username"))
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False) 
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)

    user = relationship("User", back_populates="history") 