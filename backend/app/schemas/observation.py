from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ObservationBase(BaseModel):
    report_id: int
    category: Optional[str] = None
    description: str
    severity: Optional[int] = None
    area: Optional[str] = None
    risk: Optional[str] = None
    confidence: Optional[float] = None


class ObservationCreate(ObservationBase):
    pass


class Observation(ObservationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
