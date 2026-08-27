from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from app.database import get_db
from app.dependencies import get_current_government_user
import io
import csv
from typing import Optional

router = APIRouter()

@router.get("/issues")
async def export_issues(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    query = {}
    if city: query["city"] = city
    
    cursor = db.civic_issues.find(query)
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Title", "Type", "Priority", "Status", "City", "State", "Department", "Authority", "Report Count"])
    
    async for issue in cursor:
        writer.writerow([
            str(issue.get("_id")),
            issue.get("title", ""),
            issue.get("type", ""),
            issue.get("priority", ""),
            issue.get("status", ""),
            issue.get("city", ""),
            issue.get("state", ""),
            issue.get("department", ""),
            issue.get("authority", ""),
            issue.get("reportsCount", 1)
        ])
        
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=civic_issues_export.csv"}
    )

@router.get("/reports")
async def export_reports(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    query = {}
    if city: query["city"] = city
    
    cursor = db.reports.find(query)
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Description", "Language", "City", "State", "Status", "Timestamp"])
    
    async for report in cursor:
        writer.writerow([
            str(report.get("_id")),
            report.get("description", ""),
            report.get("original_language", ""),
            report.get("city", ""),
            report.get("state", ""),
            report.get("status", ""),
            report.get("timestamp", "")
        ])
        
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=reports_export.csv"}
    )
