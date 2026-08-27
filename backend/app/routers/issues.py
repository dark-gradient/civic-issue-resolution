from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.database import get_db
from app.dependencies import get_current_user_payload, get_current_government_user, get_current_citizen, require_roles
from app.services.storage import upload_image_to_storage
from pydantic import BaseModel

router = APIRouter()

async def append_timeline(db, issue_id: str, status: str, actor: str, notes: str):
    event = {
        "id": f"t-{datetime.utcnow().timestamp()}",
        "status": status,
        "timestamp": datetime.utcnow(),
        "actor": actor,
        "notes": notes
    }
    await db.civic_issues.update_one(
        {"_id": ObjectId(issue_id)},
        {
            "$push": {"timeline": event},
            "$set": {"status": status, "updated_at": datetime.utcnow()}
        }
    )

class IssueAssignRequest(BaseModel):
    team_id: Optional[str] = None
    officer_id: Optional[str] = None
    notes: Optional[str] = None

class IssueVerificationRequest(BaseModel):
    action: str  # 'confirmed' or 'rejected'
    notes: Optional[str] = None

@router.get("")
async def get_issues(
    city: Optional[str] = None,
    state: Optional[str] = None,
    issue_type: Optional[str] = None,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    department: Optional[str] = None,
    authority: Optional[str] = None,
    ward: Optional[str] = None,
    language: Optional[str] = None,
    limit: int = Query(50, ge=1, le=100),
    skip: int = Query(0, ge=0),
    db=Depends(get_db),
    user_payload=Depends(get_current_government_user)
):
    query = {}
    if city: query["city"] = city
    if state: query["state"] = state
    if issue_type: query["type"] = issue_type
    if status: query["status"] = status
    if priority: query["priority"] = priority
    if department: query["department"] = department
    if authority: query["authority"] = authority
    if ward: query["ward"] = ward
    if language: query["originalLanguage"] = language

    cursor = db.civic_issues.find(query).sort("reportedAt", -1).skip(skip).limit(limit)
    issues = await cursor.to_list(length=limit)
    
    for i in issues:
        i["id"] = str(i.pop("_id"))
        
    return issues

@router.get("/{issue_id}")
async def get_issue_detail(
    issue_id: str,
    db=Depends(get_db),
    user_payload=Depends(get_current_user_payload)
):
    issue = await db.civic_issues.find_one({"_id": ObjectId(issue_id)})
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
        
    issue["id"] = str(issue.pop("_id"))
    return issue

class IssuePatchRequest(BaseModel):
    priority: Optional[str] = None
    department: Optional[str] = None
    authority: Optional[str] = None
    status: Optional[str] = None

@router.patch("/{issue_id}")
async def update_issue(
    issue_id: str,
    data: IssuePatchRequest,
    db=Depends(get_db),
    user_payload=Depends(get_current_government_user)
):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        return {"status": "no_change"}
        
    update_data["updated_at"] = datetime.utcnow()
    
    await db.civic_issues.update_one(
        {"_id": ObjectId(issue_id)},
        {"$set": update_data}
    )
    
    # If status changed, record timeline
    if data.status:
        await append_timeline(db, issue_id, data.status, user_payload.get("sub"), "Status updated manually")
        
    return {"status": "success"}

@router.post("/{issue_id}/assign")
async def assign_issue(
    issue_id: str,
    data: IssueAssignRequest,
    db=Depends(get_db),
    user_payload=Depends(require_roles(["municipal_admin", "department_officer", "supervisor"]))
):
    issue = await db.civic_issues.find_one({"_id": ObjectId(issue_id)})
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    actor = user_payload.get("sub")
    await db.civic_issues.update_one(
        {"_id": ObjectId(issue_id)},
        {"$set": {
            "assignee": data.officer_id or data.team_id,
            "assigned_team": data.team_id
        }}
    )
    await append_timeline(db, issue_id, "ASSIGNED", actor, data.notes or "Issue assigned to team/officer.")
    return {"status": "success", "message": "Issue assigned"}

@router.post("/{issue_id}/start")
async def start_issue(
    issue_id: str,
    db=Depends(get_db),
    user_payload=Depends(require_roles(["municipal_admin", "supervisor", "field_staff"]))
):
    actor = user_payload.get("sub")
    await append_timeline(db, issue_id, "IN_PROGRESS", actor, "Work started on the issue.")
    return {"status": "success"}

@router.post("/{issue_id}/resolution-evidence")
async def upload_resolution_evidence(
    issue_id: str,
    notes: str = Form(""),
    image: UploadFile = File(...),
    db=Depends(get_db),
    user_payload=Depends(require_roles(["supervisor", "field_staff"]))
):
    image_url = await upload_image_to_storage(image)
    actor = user_payload.get("sub")
    
    await db.civic_issues.update_one(
        {"_id": ObjectId(issue_id)},
        {"$set": {"images.after": image_url}}
    )
    
    await append_timeline(db, issue_id, "RESOLVED", actor, f"Resolution evidence uploaded. Notes: {notes}")
    return {"status": "success", "image_url": image_url}

@router.post("/{issue_id}/resolve")
async def resolve_issue(
    issue_id: str,
    db=Depends(get_db),
    user_payload=Depends(require_roles(["supervisor", "field_staff", "department_officer"]))
):
    actor = user_payload.get("sub")
    await append_timeline(db, issue_id, "AWAITING_CITIZEN_VERIFICATION", actor, "Issue marked resolved, awaiting citizen verification.")
    return {"status": "success"}

@router.post("/{issue_id}/reopen")
async def reopen_issue(
    issue_id: str,
    notes: str = Query(...),
    db=Depends(get_db),
    user_payload=Depends(get_current_government_user)
):
    actor = user_payload.get("sub")
    await append_timeline(db, issue_id, "REOPENED", actor, f"Issue reopened: {notes}")
    return {"status": "success"}

@router.post("/{issue_id}/verify-resolution")
async def verify_resolution(
    issue_id: str,
    data: IssueVerificationRequest,
    db=Depends(get_db),
    user_payload=Depends(get_current_citizen)
):
    issue = await db.civic_issues.find_one({"_id": ObjectId(issue_id)})
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
        
    actor = user_payload.get("sub")
    
    if data.action == "confirmed":
        await append_timeline(db, issue_id, "CLOSED", actor, data.notes or "Citizen confirmed resolution.")
    elif data.action == "rejected":
        await append_timeline(db, issue_id, "REOPENED", actor, data.notes or "Citizen rejected resolution.")
    else:
        raise HTTPException(status_code=400, detail="Invalid action")
        
    return {"status": "success"}
