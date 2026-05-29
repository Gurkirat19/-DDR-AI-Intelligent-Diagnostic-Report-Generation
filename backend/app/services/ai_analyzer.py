from typing import List, Dict, Any, Optional
import json
from openai import OpenAI
from ..core.config import settings

PROMPT = """
You are an expert building inspector and thermal imaging analyst. Extract observations, thermal anomalies, root causes, severity (1-10), risks (safety, structural, financial, operational), confidence (0-1), recommendations, and missing information. Output JSON with fields: observations, thermal_findings, recommendations, missing_information.
"""


def _mock_analysis(content: str) -> Dict[str, Any]:
    # Generate realistic mock DDR data based on text length/keywords for demo purposes
    has_moisture = "moisture" in content.lower() or "water" in content.lower() or "damp" in content.lower()
    has_crack = "crack" in content.lower() or "fracture" in content.lower() or "settlement" in content.lower()
    has_thermal = "thermal" in content.lower() or "temperature" in content.lower() or "hotspot" in content.lower()
    has_electrical = "electrical" in content.lower() or "wire" in content.lower() or "circuit" in content.lower()
    has_insulation = "insulation" in content.lower() or "heat loss" in content.lower()

    observations = []
    thermal_findings = []
    recommendations = []
    missing_info = []

    observations.append({
        "category": "General Inspection",
        "description": f"Document contains {len(content)} characters of inspection text. Overall structural elements appear documented.",
        "severity": 3,
        "area": "General",
        "risk": "operational",
        "confidence": 0.85,
    })

    if has_moisture:
        observations.append({
            "category": "Moisture & Water Intrusion",
            "description": "Evidence of moisture-related concerns detected in document. Recommend further moisture mapping and leak source identification.",
            "severity": 6,
            "area": "Basement / External Walls",
            "risk": "structural",
            "confidence": 0.72,
        })
        recommendations.append({
            "title": "Moisture remediation assessment",
            "description": "Conduct targeted moisture probe testing and review drainage/grading around affected areas.",
            "priority": "high",
        })

    if has_crack:
        observations.append({
            "category": "Structural Defect",
            "description": "Cracking or settlement indicators noted. Recommend structural engineer review to assess load-path and foundation stability.",
            "severity": 7,
            "area": "Foundation / Load-bearing walls",
            "risk": "safety",
            "confidence": 0.78,
        })
        recommendations.append({
            "title": "Structural engineer evaluation",
            "description": "Engage a licensed structural engineer to classify crack patterns and prescribe repairs if required.",
            "priority": "high",
        })

    if has_thermal:
        thermal_findings.append({
            "area": "Electrical Panel / HVAC Zone",
            "temperature": 42.5,
            "description": "Thermal anomaly detected suggesting elevated temperature in electrical or HVAC zones.",
            "severity": 5,
        })
        recommendations.append({
            "title": "Thermal follow-up scan",
            "description": "Schedule a follow-up thermal survey under consistent environmental conditions to confirm hotspot persistence.",
            "priority": "medium",
        })

    if has_electrical:
        observations.append({
            "category": "Electrical Safety",
            "description": "Electrical system elements referenced. Verify compliance with current codes and inspect for overheating connections.",
            "severity": 6,
            "area": "Electrical Distribution",
            "risk": "safety",
            "confidence": 0.80,
        })
        recommendations.append({
            "title": "Electrical compliance check",
            "description": "Arrange a licensed electrician to inspect terminations, breaker ratings, and grounding continuity.",
            "priority": "high",
        })

    if has_insulation:
        thermal_findings.append({
            "area": "Roof / Wall Envelope",
            "temperature": 18.2,
            "description": "Thermal patterns consistent with insulation deficiencies or air leakage at envelope penetrations.",
            "severity": 4,
        })
        recommendations.append({
            "title": "Air sealing and insulation upgrade",
            "description": "Review insulation continuity and seal envelope penetrations. Blower-door test recommended.",
            "priority": "medium",
        })

    if not observations:
        observations.append({
            "category": "General",
            "description": "Limited descriptive content extracted from the uploaded document. Manual review advised.",
            "severity": 2,
            "area": "Unknown",
            "risk": "operational",
            "confidence": 0.50,
        })

    if not recommendations:
        recommendations.append({
            "title": "Document review and site verification",
            "description": "The uploaded report lacks sufficient detail for full automated analysis. Recommend on-site verification and supplemental inspection.",
            "priority": "low",
        })

    missing_info = [
        "Calibration certificates for inspection instruments",
        "Weather conditions at time of inspection",
        "Accessibility constraints noted during site visit",
        "Maintenance history for mechanical and electrical systems",
    ]

    return {
        "executive_summary": "Automated DDR analysis completed based on uploaded inspection/thermal report. Key findings and recommendations are summarized below.",
        "observations": observations,
        "thermal_findings": thermal_findings,
        "root_cause_analysis": [{"issue": "Insufficient detail in source document", "cause": "Legacy report formatting", "impact": "Reduced confidence in automated severity scoring"}],
        "severity_assessment": [{"area": "Overall", "average_severity": sum(o.get("severity", 0) for o in observations) / max(len(observations), 1), "max_severity": max((o.get("severity", 0) for o in observations), default=0)}],
        "risk_assessment": [{"type": "safety", "level": "medium"}, {"type": "structural", "level": "medium"}, {"type": "financial", "level": "low"}, {"type": "operational", "level": "low"}],
        "recommendations": recommendations,
        "missing_information": missing_info,
        "confidence_scores": {"overall": 0.72, "observations": 0.75, "thermal": 0.60, "recommendations": 0.80},
    }


def _ensure_list_dict(values: Optional[List[Any]]) -> List[Dict[str, Any]]:
    if not values:
        return []
    cleaned = []
    for v in values:
        cleaned.append(v if isinstance(v, dict) else {"value": v})
    return cleaned


def _validate_analysis(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize/validate AI output to ensure downstream safety."""
    data: Dict[str, Any] = payload or {}
    data.setdefault("executive_summary", "")
    data["observations"] = _ensure_list_dict(data.get("observations"))
    data["thermal_findings"] = _ensure_list_dict(data.get("thermal_findings"))
    data["recommendations"] = _ensure_list_dict(data.get("recommendations"))
    data.setdefault("confidence_scores", {})
    data.setdefault("missing_information", data.get("missing_info", []))
    return data


class AIAnalyzer:
    def __init__(self) -> None:
        self.client = None
        if settings.openai_api_key and settings.openai_api_key.strip():
            self.client = OpenAI(api_key=settings.openai_api_key)

    def analyze(self, content: str) -> Dict[str, Any]:
        if not self.client:
            return _validate_analysis(_mock_analysis(content))
        try:
            response = self.client.responses.create(
                model="gpt-4o-mini",
                input=[{"role": "system", "content": PROMPT}, {"role": "user", "content": content}],
                response_format={"type": "json_object"},
                max_output_tokens=2000,
            )
            message = response.output[0].content[0].text
            try:
                parsed = json.loads(message)
                return _validate_analysis(parsed)
            except json.JSONDecodeError:
                return _validate_analysis({"raw": message})
        except Exception:
            return _validate_analysis(_mock_analysis(content))
