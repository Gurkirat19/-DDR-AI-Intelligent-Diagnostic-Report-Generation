from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any, List


class ReportBase(BaseModel):
    title: str
    project_id: Optional[int] = None
    source_file: Optional[str] = None
    content_text: Optional[str] = None
    analysis: Optional[Any] = None


class ReportCreate(ReportBase):
    pass


class Report(ReportBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
