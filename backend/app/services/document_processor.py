from pathlib import Path
from typing import List
import csv

import fitz
import pdfplumber


try:
    import docx  # type: ignore
except ImportError:  # pragma: no cover - optional dependency
    docx = None


class DocumentProcessor:
    def extract_text(self, file_path: Path) -> str:
        suffix = file_path.suffix.lower()
        if suffix == ".pdf":
            return self._extract_text_pdf(file_path)
        if suffix in {".txt"}:
            return file_path.read_text(errors="ignore")
        if suffix in {".csv"}:
            return self._extract_text_csv(file_path)
        if suffix in {".docx"} and docx:
            return self._extract_text_docx(file_path)
        return ""

    def _extract_text_pdf(self, file_path: Path) -> str:
        with pdfplumber.open(file_path) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
            return "\n".join(pages)

    def _extract_text_csv(self, file_path: Path) -> str:
        try:
            with file_path.open(newline="", encoding="utf-8", errors="ignore") as f:
                reader = csv.reader(f)
                return "\n".join([", ".join(row) for row in reader])
        except Exception:
            return ""

    def _extract_text_docx(self, file_path: Path) -> str:
        if not docx:
            return ""
        try:
            document = docx.Document(file_path)
            paragraphs = [p.text for p in document.paragraphs if p.text]
            return "\n".join(paragraphs)
        except Exception:
            return ""

    def extract_images(self, file_path: Path) -> List[bytes]:
        if file_path.suffix.lower() != ".pdf":
            return []
        images: List[bytes] = []
        with fitz.open(file_path) as doc:
            for page in doc:
                for img in page.get_images(full=True):
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]
                    images.append(image_bytes)
        return images
