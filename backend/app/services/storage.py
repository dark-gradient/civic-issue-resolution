import os
import uuid
from fastapi import UploadFile
from app.config import settings
import aiofiles

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_image_to_storage(file: UploadFile) -> str:
    """
    Simulates uploading an image to an Object Storage service like AWS S3.
    For this prototype, it saves locally and returns a URL.
    """
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    filename = f"{uuid.uuid4().hex}.{ext}"
    
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
        
    # Return a dummy object storage URL or local static URL
    # Assuming FastAPI serves /uploads static dir
    return f"/uploads/{filename}"
