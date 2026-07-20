from pydantic import BaseModel
from datetime import datetime


class ReviewRequest(BaseModel):
    title: str
    language: str
    code: str


class ReviewResponse(BaseModel):
    review: str


class ReviewHistory(BaseModel):
    id: int
    title: str
    language: str
    code: str
    review: str

    score: int
    bugs: int
    security_score: int
    performance_score: int
    quality_score: int

    created_at: datetime

    class Config:
        from_attributes = True