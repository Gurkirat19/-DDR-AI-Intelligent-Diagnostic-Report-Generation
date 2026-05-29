from pathlib import Path
from typing import Iterable
import re


def sanitize_filename(name: str) -> str:
    """Return a filesystem-safe filename (no path separators)."""
    name = name.strip() or "upload"
    name = name.replace("\\", "/").split("/")[-1]
    # Remove characters that are problematic on common filesystems
    name = re.sub(r"[^A-Za-z0-9._-]+", "_", name)
    return name or "upload"


def ensure_allowed_extension(ext: str, allowed: Iterable[str]) -> None:
    if ext.lower() not in {e.lower() for e in allowed}:
        raise ValueError("Unsupported file type")


def unique_path(base_dir: Path, filename: str) -> Path:
    base_dir.mkdir(parents=True, exist_ok=True)
    path = base_dir / filename
    if not path.exists():
        return path
    stem = Path(filename).stem
    suffix = Path(filename).suffix
    counter = 1
    while path.exists():
        path = base_dir / f"{stem}_{counter}{suffix}"
        counter += 1
    return path
