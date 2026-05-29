from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ImageBase(BaseModel):
    report_id: int
    filename: str
    data: Optional[bytes] = None


class ImageCreate(ImageBase):
    pass


class Image(ImageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
