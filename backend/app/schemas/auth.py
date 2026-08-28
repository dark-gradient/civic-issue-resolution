from pydantic import BaseModel, Field
from typing import Optional

class CitizenRegisterRequest(BaseModel):
    name: str
    phone: str  # Raw phone, will be hashed
    preferred_language: str = "en"
    city: str
    state: str

class CitizenLoginRequest(BaseModel):
    phone: str
    otp: str = "123456" # Simulated OTP

class GovernmentLoginRequest(BaseModel):
    employee_id: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_type: str
    role: str

class UserMeResponse(BaseModel):
    id: str
    name: str
    user_type: str
    role: str
    city: Optional[str] = None
    state: Optional[str] = None
    department_id: Optional[str] = None
    authority_id: Optional[str] = None
    verified: bool = False
    identity_verification_status: str = "unverified"
    identity_identifier_protected: bool = False
\nclass VerifyIdentityRequest(BaseModel):\n    aadhaar_identifier: str\n