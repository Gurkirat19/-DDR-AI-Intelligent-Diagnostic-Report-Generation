from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, LargeBinary, func
from ..db.session import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    filename = Column(String(255), nullable=False)
    data = Column(LargeBinary, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
