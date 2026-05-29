from pathlib import Path
from typing import List
import fitz


class ImageExtractor:
    def extract(self, file_path: Path) -> List[bytes]:
        images: List[bytes] = []
        if file_path.suffix.lower() != ".pdf":
            return images
        with fitz.open(file_path) as doc:
            for page in doc:
                for img in page.get_images(full=True):
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]
                    images.append(image_bytes)
        return images
