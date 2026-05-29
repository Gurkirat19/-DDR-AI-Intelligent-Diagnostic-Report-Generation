from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any


class DDRReportBase(BaseModel):
    report_id: int
    sections: Optional[Any] = None


class DDRReportCreate(DDRReportBase):
    pass


class DDRReport(DDRReportBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
