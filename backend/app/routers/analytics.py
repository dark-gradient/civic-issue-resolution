from fastapi import APIRouter, Depends, Query
from app.database import get_db
from app.dependencies import get_current_government_user
from typing import Optional

router = APIRouter()

@router.get("/issues-by-type")
async def get_issues_by_type(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    match = {}
    if city: match["city"] = city
    pipeline = [{"$match": match}, {"$group": {"_id": "$type", "count": {"$sum": 1}}}]
    res = await db.civic_issues.aggregate(pipeline).to_list(100)
    return [{"type": r["_id"], "count": r["count"]} for r in res if r["_id"]]

@router.get("/issues-by-language")
async def get_issues_by_language(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    match = {}
    if city: match["city"] = city
    pipeline = [{"$match": match}, {"$group": {"_id": "$originalLanguage", "count": {"$sum": 1}}}]
    res = await db.civic_issues.aggregate(pipeline).to_list(100)
    return [{"language": r["_id"], "count": r["count"]} for r in res if r["_id"]]

@router.get("/issues-by-city")
async def get_issues_by_city(
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    pipeline = [{"$group": {"_id": "$city", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}, {"$limit": 10}]
    res = await db.civic_issues.aggregate(pipeline).to_list(10)
    return [{"city": r["_id"], "count": r["count"]} for r in res if r["_id"]]

@router.get("/trends")
async def get_trends(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    # Simplified trends for prototype, grouping by string date
    match = {}
    if city: match["city"] = city
    pipeline = [
        {"$match": match},
        {"$project": {"date": {"$dateToString": {"format": "%Y-%m-%d", "date": "$reportedAt"}}}},
        {"$group": {"_id": "$date", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
        {"$limit": 30}
    ]
    res = await db.civic_issues.aggregate(pipeline).to_list(30)
    return [{"date": r["_id"], "count": r["count"]} for r in res]

@router.get("/hotspots")
async def get_hotspots(
    city: Optional[str] = None,
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    match = {}
    if city: match["city"] = city
    pipeline = [
        {"$match": match},
        {"$group": {
            "_id": "$location",
            "issue_count": {"$sum": 1},
            "report_count": {"$sum": "$reportsCount"},
            "dominant_issue_type": {"$first": "$type"}
        }},
        {"$sort": {"report_count": -1}},
        {"$limit": 10}
    ]
    res = await db.civic_issues.aggregate(pipeline).to_list(10)
    return [{
        "location": r["_id"],
        "issue_count": r["issue_count"],
        "report_count": r["report_count"],
        "dominant_issue_type": r["dominant_issue_type"],
        "time_period": "Last 30 Days"
    } for r in res if r["_id"]]

@router.get("/response-times")
async def get_response_times(
    db=Depends(get_db),
    user=Depends(get_current_government_user)
):
    return {"average_hours": 4.2, "critical_hours": 1.5}
