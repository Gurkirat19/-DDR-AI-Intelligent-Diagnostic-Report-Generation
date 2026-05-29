from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, func
from ..db.session import Base


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    severity = Column(Integer, nullable=True)
    area = Column(String(255), nullable=True)
    risk = Column(String(50), nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
