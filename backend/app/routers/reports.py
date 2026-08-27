from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.database import get_db
from app.dependencies import get_current_user_payload, get_current_citizen
from app.services.storage import upload_image_to_storage
from pydantic import BaseModel

router = APIRouter()

class ReportResponse(BaseModel):
    report_id: str
    status: str
    created_at: datetime
    image_url: str

@router.post("", response_model=ReportResponse)
async def create_report(
    description: str = Form(...),
    language: str = Form("en"),
    latitude: float = Form(...),
    longitude: float = Form(...),
    city: str = Form(""),
    state: str = Form(""),
    address: str = Form(""),
    image: UploadFile = File(...),
    db=Depends(get_db),
    user_payload=Depends(get_current_citizen)
):
    citizen_id = user_payload.get("sub")
    
    # 1. Upload Image
    image_url = await upload_image_to_storage(image)
    
    # 2. Prepare Report Data with GeoJSON
    report = {
        "citizen_id": citizen_id,
        "description": description,
        "original_language": language,
        "normalized_description": description, # NLP normalization simulated
        "image_url": image_url,
        "location": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        },
        "city": city,
        "state": state,
        "address": address,
        "status": "received",
        "timestamp": datetime.utcnow()
    }
    
    # 3. Create record
    res = await db.reports.insert_one(report)
    report_id = str(res.inserted_id)
    
    # Return
    return ReportResponse(
        report_id=report_id,
        status="received",
        created_at=report["timestamp"],
        image_url=image_url
    )

@router.get("/my")
async def get_my_reports(
    status: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    skip: int = Query(0, ge=0),
    db=Depends(get_db),
    user_payload=Depends(get_current_citizen)
):
    citizen_id = user_payload.get("sub")
    
    query = {"citizen_id": citizen_id}
    if status:
        query["status"] = status
        
    cursor = db.reports.find(query).sort("timestamp", -1).skip(skip).limit(limit)
    reports = await cursor.to_list(length=limit)
    
    # Transform _id to id string
    for r in reports:
        r["id"] = str(r.pop("_id"))
        
    return reports

@router.get("/{report_id}")
async def get_report_detail(
    report_id: str,
    db=Depends(get_db),
    user_payload=Depends(get_current_user_payload)
):
    try:
        obj_id = ObjectId(report_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid report ID")
        
    report = await db.reports.find_one({"_id": obj_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    # Access check: owner or government
    if user_payload.get("type") == "citizen":
        if report.get("citizen_id") != user_payload.get("sub"):
            raise HTTPException(status_code=403, detail="Not authorized to view this report")
            
    report["id"] = str(report.pop("_id"))
    return report
