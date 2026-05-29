from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from ..db.session import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
