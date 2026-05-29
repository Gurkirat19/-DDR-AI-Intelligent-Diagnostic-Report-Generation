from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, func
from ..db.session import Base


class ThermalFinding(Base):
    __tablename__ = "thermal_findings"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    area = Column(String(255), nullable=True)
    temperature = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    severity = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
