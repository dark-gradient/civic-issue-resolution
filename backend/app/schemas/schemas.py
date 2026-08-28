from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class GeoJSON(BaseModel):
    type: str = "Point"
    coordinates: List[float] # [longitude, latitude]

class UserBase(BaseModel):
    name: str
    phone_hash: str
    city: Optional[str] = None
    state: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CitizenCreate(UserBase):
    aadhaar_hash: Optional[str] = None
    identity_verification_status: str = "unverified"
    preferred_language: str = "en"

class GovUserCreate(UserBase):
    employee_id: str
    role: str
    authority_id: str
    department_id: str

class ReportCreate(BaseModel):
    citizen_id: str
    issue_id: Optional[str] = None
    description: str
    original_language: str
    normalized_description: str
    image_url: Optional[str] = None
    latitude: float
    longitude: float
    city: str
    state: str
    address: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    trust_score: float = 0.0
    verification_state: str = "pending"
    location: Optional[GeoJSON] = None

class CivicIssueCreate(BaseModel):
    category: str
    description: str
    latitude: float
    longitude: float
    city: str
    state: str
    address: str
    jurisdiction: str
    authority_id: str
    department_id: str
    priority: str
    priority_score: float = 0.0
    status: str = "Submitted"
    report_ids: List[str] = []
    report_count: int = 1
    assigned_team_id: Optional[str] = None
    sla: Optional[int] = None
    before_image_url: Optional[str] = None
    after_image_url: Optional[str] = None
    resolution_status: Optional[str] = None
    location: Optional[GeoJSON] = None

class DepartmentCreate(BaseModel):
    name: str
    authority_id: str

class AuthorityCreate(BaseModel):
    name: str
    state: str
    city: str

class AssignmentCreate(BaseModel):
    issue_id: str
    team_id: str
    assigned_by: str
    status: str = "Active"

class ResolutionEvidenceCreate(BaseModel):
    issue_id: str
    resolved_by: str
    image_url: str
    notes: str

class NotificationCreate(BaseModel):
    user_id: str
    message: str
    is_read: bool = False

class AuditLogCreate(BaseModel):
    user_id: str
    action: str
    target_resource: str
    target_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
