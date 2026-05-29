from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ThermalFindingBase(BaseModel):
    report_id: int
    area: Optional[str] = None
    temperature: Optional[float] = None
    description: Optional[str] = None
    severity: Optional[int] = None


class ThermalFindingCreate(ThermalFindingBase):
    pass


class ThermalFinding(ThermalFindingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
