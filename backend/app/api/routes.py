import os
import logging
from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from ..db.session import get_session
from ..models import Project, Report, Observation, ThermalFinding, Recommendation, Image, DDRReport
from ..schemas.project import ProjectCreate, Project as ProjectSchema
from ..schemas.report import ReportCreate, Report as ReportSchema
from ..services.document_processor import DocumentProcessor
from ..services.image_extractor import ImageExtractor
from ..services.ai_analyzer import AIAnalyzer
from ..utils.files import sanitize_filename, ensure_allowed_extension, unique_path
from ..services.report_generator import ReportGenerator
from ..core.config import settings

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health")
async def api_health():
    return {"status": "ok"}


@router.post("/projects", response_model=ProjectSchema)
async def create_project(payload: ProjectCreate, session: AsyncSession = Depends(get_session)):
    project = Project(name=payload.name, description=payload.description)
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project


@router.get("/reports")
async def list_reports(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Report).order_by(Report.created_at.desc()))
    return result.scalars().all()


@router.get("/reports/{report_id}")
async def get_report(report_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(Report)
        .where(Report.id == report_id)
        .options(
            selectinload(Report.observations),
            selectinload(Report.thermal_findings),
            selectinload(Report.recommendations),
            selectinload(Report.images),
            selectinload(Report.ddr_reports),
        )
    )
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    def to_dict(obj, exclude=None):
        exclude = exclude or []
        d = {}
        for col in obj.__table__.columns:
            if col.name not in exclude:
                d[col.name] = getattr(obj, col.name)
        return d

    return {
        **to_dict(report),
        "observations": [to_dict(o) for o in report.observations],
        "thermal_findings": [to_dict(t) for t in report.thermal_findings],
        "recommendations": [to_dict(r) for r in report.recommendations],
        "images": [to_dict(i, exclude=["data"]) for i in report.images],
        "ddr_reports": [to_dict(d) for d in report.ddr_reports],
    }


@router.post("/upload")
async def upload_file(file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    allowed_ext = {".pdf", ".txt", ".csv", ".docx", ".png", ".jpg", ".jpeg"}
    max_bytes = 50 * 1024 * 1024  # 50 MB

    # Ensure storage directory exists
    storage = Path(settings.storage_path)
    storage.mkdir(parents=True, exist_ok=True)

    # Save file
    ext = Path(file.filename or "upload").suffix
    if ext.lower() not in allowed_ext:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    original_name = sanitize_filename(file.filename or "upload")
    safe_name = f"{original_name}{ext}"
    ensure_allowed_extension(ext, allowed_ext)
    file_path = unique_path(storage, safe_name)

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")
    if len(content) > max_bytes:
        raise HTTPException(status_code=413, detail="File too large (max 50MB)")
    file_path.write_bytes(content)

    # Extract text and images
    processor = DocumentProcessor()
    extractor = ImageExtractor()
    text_content = ""
    images_bytes: list[bytes] = []
    try:
        text_content = processor.extract_text(file_path)
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("text extraction failed for %s: %s", file_path.name, exc)
    try:
        images_bytes = extractor.extract(file_path)
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("image extraction failed for %s: %s", file_path.name, exc)

    # Create report record
    report = Report(
        title=file.filename or "Untitled Report",
        source_file=str(file_path),
        content_text=text_content,
    )
    session.add(report)
    await session.commit()
    await session.refresh(report)

    # Save images
    for idx, img_bytes in enumerate(images_bytes):
        img = Image(report_id=report.id, filename=f"image_{idx+1}.png", data=img_bytes)
        session.add(img)

    # AI Analysis (with mock fallback if no API key)
    analyzer = AIAnalyzer()
    analysis = analyzer.analyze(text_content[:8000])  # truncate for token limits

    # Store observations
    for obs in analysis.get("observations", []):
        if isinstance(obs, dict):
            o = Observation(
                report_id=report.id,
                category=obs.get("category", "General"),
                description=obs.get("description", ""),
                severity=obs.get("severity"),
                area=obs.get("area"),
                risk=obs.get("risk"),
                confidence=obs.get("confidence"),
            )
            session.add(o)

    # Store thermal findings
    for tf in analysis.get("thermal_findings", []):
        if isinstance(tf, dict):
            t = ThermalFinding(
                report_id=report.id,
                area=tf.get("area"),
                temperature=tf.get("temperature"),
                description=tf.get("description"),
                severity=tf.get("severity"),
            )
            session.add(t)

    # Store recommendations
    for rec in analysis.get("recommendations", []):
        if isinstance(rec, dict):
            r = Recommendation(
                report_id=report.id,
                title=rec.get("title", "Recommendation"),
                description=rec.get("description"),
                priority=rec.get("priority"),
            )
            session.add(r)

    # Build DDR sections
    sections = {
        "executive_summary": analysis.get("executive_summary", f"DDR for {report.title}"),
        "property_details": {"source_file": report.source_file, "text_length": len(text_content)},
        "observations": analysis.get("observations", []),
        "thermal_findings": analysis.get("thermal_findings", []),
        "root_cause_analysis": analysis.get("root_cause_analysis", []),
        "severity_assessment": analysis.get("severity_assessment", []),
        "risk_assessment": analysis.get("risk_assessment", []),
        "recommendations": analysis.get("recommendations", []),
        "missing_information": analysis.get("missing_information", []),
        "confidence_scores": analysis.get("confidence_scores", {}),
    }

    ddr = DDRReport(report_id=report.id, sections=sections)
    session.add(ddr)
    report.analysis = analysis
    await session.commit()
    await session.refresh(report)

    return {
        "report_id": report.id,
        "title": report.title,
        "observations_count": len(analysis.get("observations", [])),
        "thermal_findings_count": len(analysis.get("thermal_findings", [])),
        "recommendations_count": len(analysis.get("recommendations", [])),
    }


@router.get("/export/json/{report_id}")
async def export_json(report_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(DDRReport).where(DDRReport.report_id == report_id))
    ddr = result.scalar_one_or_none()
    if not ddr:
        raise HTTPException(status_code=404, detail="DDR report not found")
    gen = ReportGenerator()
    out_path = Path(settings.storage_path) / f"report_{report_id}.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    gen.to_json(ddr.sections or {}, out_path)
    return FileResponse(str(out_path), media_type="application/json", filename=out_path.name)


@router.get("/export/pdf/{report_id}")
async def export_pdf(report_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(DDRReport).where(DDRReport.report_id == report_id))
    ddr = result.scalar_one_or_none()
    if not ddr:
        raise HTTPException(status_code=404, detail="DDR report not found")
    gen = ReportGenerator()
    out_path = Path(settings.storage_path) / f"report_{report_id}.pdf"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    gen.to_pdf(ddr.sections or {}, out_path)
    return FileResponse(str(out_path), media_type="application/pdf", filename=out_path.name)


@router.get("/export/excel/{report_id}")
async def export_excel(report_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(DDRReport).where(DDRReport.report_id == report_id))
    ddr = result.scalar_one_or_none()
    if not ddr:
        raise HTTPException(status_code=404, detail="DDR report not found")
    gen = ReportGenerator()
    out_path = Path(settings.storage_path) / f"report_{report_id}.xlsx"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    gen.to_excel(ddr.sections or {}, out_path)
    return FileResponse(str(out_path), media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename=out_path.name)
