from sqlalchemy import Column, Integer, DateTime, ForeignKey, JSON, func
from ..db.session import Base


class DDRReport(Base):
    __tablename__ = "ddr_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    sections = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
