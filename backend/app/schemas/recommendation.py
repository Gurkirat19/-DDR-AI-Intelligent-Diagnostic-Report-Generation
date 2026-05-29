from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RecommendationBase(BaseModel):
    report_id: int
    title: str
    description: Optional[str] = None
    priority: Optional[str] = None


class RecommendationCreate(RecommendationBase):
    pass


class Recommendation(RecommendationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
