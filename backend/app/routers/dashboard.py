from fastapi import APIRouter, Depends, Query
from app.database import get_db
from app.dependencies import get_current_government_user
from datetime import datetime, timedelta
from typing import Optional

router = APIRouter()

@router.get("/overview")
async def get_overview(
    city: Optional[str] = None,
    state: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    match = {}
    if city: match["city"] = city
    if state: match["state"] = state
    
    pipeline = [
        {"$match": match},
        {"$group": {
            "_id": None,
            "total_issues": {"$sum": 1},
            "open_issues": {"$sum": {"$cond": [{"$in": ["$status", ["Submitted", "Assigned", "Under Review"]]}, 1, 0]}},
            "critical_issues": {"$sum": {"$cond": [{"$eq": ["$priority", "Critical"]}, 1, 0]}},
            "high_priority": {"$sum": {"$cond": [{"$eq": ["$priority", "High"]}, 1, 0]}},
            "in_progress": {"$sum": {"$cond": [{"$in": ["$status", ["In Progress", "IN_PROGRESS"]]}, 1, 0]}},
            "resolved": {"$sum": {"$cond": [{"$in": ["$status", ["Resolved", "RESOLVED", "AWAITING_CITIZEN_VERIFICATION"]]}, 1, 0]}},
            "reopened": {"$sum": {"$cond": [{"$in": ["$status", ["Reopened", "REOPENED"]]}, 1, 0]}},
            "total_reports": {"$sum": "$reportsCount"}
        }}
    ]
    
    res = await db.civic_issues.aggregate(pipeline).to_list(1)
    stats = res[0] if res else {
        "total_issues": 0, "open_issues": 0, "critical_issues": 0, "high_priority": 0, 
        "in_progress": 0, "resolved": 0, "reopened": 0, "total_reports": 0
    }
    
    # Dummy calculation for times and SLA for prototype
    stats["sla_breaches"] = 0
    stats["average_response_time"] = "4.2h"
    stats["average_resolution_time"] = "32h"
    stats["citizen_verification_rate"] = "78%"
    stats["unique_issues"] = stats["total_issues"]
    
    if "_id" in stats:
        del stats["_id"]
        
    return stats

@router.get("/map")
async def get_dashboard_map(
    city: Optional[str] = None,
    state: Optional[str] = None,
    issue_type: Optional[str] = None,
    priority: Optional[str] = None,
    status: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    query = {}
    if city: query["city"] = city
    if state: query["state"] = state
    if issue_type: query["type"] = issue_type
    if priority: query["priority"] = priority
    if status: query["status"] = status
    
    cursor = db.civic_issues.find(query, {"lat": 1, "lng": 1, "type": 1, "priority": 1, "status": 1, "reportsCount": 1})
    issues = await cursor.to_list(1000)
    
    return [{"id": str(i["_id"]), "latitude": i.get("lat"), "longitude": i.get("lng"), "issue_type": i.get("type"), "priority": i.get("priority"), "status": i.get("status"), "report_count": i.get("reportsCount", 1)} for i in issues]

@router.get("/heatmap")
async def get_dashboard_heatmap(
    city: Optional[str] = None,
    state: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    query = {}
    if city: query["city"] = city
    if state: query["state"] = state
    
    cursor = db.civic_issues.find(query, {"lat": 1, "lng": 1, "reportsCount": 1})
    issues = await cursor.to_list(2000)
    
    # Returns [lat, lng, weight]
    return [[i.get("lat"), i.get("lng"), min(1.0, i.get("reportsCount", 1) / 50.0)] for i in issues]

@router.get("/departments")
async def get_department_performance(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    match = {}
    if city: match["city"] = city
    
    pipeline = [
        {"$match": match},
        {"$group": {
            "_id": "$department",
            "total": {"$sum": 1},
            "open_issues": {"$sum": {"$cond": [{"$in": ["$status", ["Submitted", "Assigned"]]}, 1, 0]}},
            "critical": {"$sum": {"$cond": [{"$eq": ["$priority", "Critical"]}, 1, 0]}},
            "in_progress": {"$sum": {"$cond": [{"$in": ["$status", ["In Progress", "IN_PROGRESS"]]}, 1, 0]}},
            "resolved": {"$sum": {"$cond": [{"$in": ["$status", ["Resolved", "RESOLVED", "AWAITING_CITIZEN_VERIFICATION", "CLOSED", "Closed"]]}, 1, 0]}}
        }}
    ]
    
    res = await db.civic_issues.aggregate(pipeline).to_list(100)
    
    return [{
        "department": r["_id"] or "Unassigned",
        "open_issues": r["open_issues"],
        "critical": r["critical"],
        "in_progress": r["in_progress"],
        "resolved": r["resolved"],
        "backlog": r["open_issues"] + r["in_progress"],
        "sla_compliance": "85%",
        "average_response_time": "3.5h",
        "average_resolution_time": "48h"
    } for r in res]
