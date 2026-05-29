from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON, func
from sqlalchemy.orm import relationship
from ..db.session import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    source_file = Column(String(512), nullable=True)
    content_text = Column(Text, nullable=True)
    analysis = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", backref="reports")
    observations = relationship("Observation", backref="report", cascade="all, delete-orphan")
    thermal_findings = relationship("ThermalFinding", backref="report", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", backref="report", cascade="all, delete-orphan")
    images = relationship("Image", backref="report", cascade="all, delete-orphan")
    ddr_reports = relationship("DDRReport", backref="report", cascade="all, delete-orphan")
