from fastapi import APIRouter, Depends, HTTPException, status, Request
from datetime import datetime, timedelta
from app.schemas.auth import CitizenRegisterRequest, CitizenLoginRequest, GovernmentLoginRequest, TokenResponse, UserMeResponse
from app.utils.security import hash_identifier, verify_password, create_access_token, get_password_hash
from app.database import get_db, db_instance
from app.dependencies import get_current_user_payload
from app.services.audit import log_audit_action
from bson import ObjectId

router = APIRouter()

@router.post("/citizen/register", response_model=TokenResponse)
async def register_citizen(data: CitizenRegisterRequest, db=Depends(get_db)):
    phone_hash = hash_identifier(data.phone)
    
    existing = await db.users.find_one({"phone_hash": phone_hash, "type": "citizen"})
    if existing:
        raise HTTPException(status_code=400, detail="Citizen with this phone already exists")
    
    new_citizen = {
        "name": data.name,
        "phone_hash": phone_hash,
        "identity_verification_status": "verified",  # Simulated
        "preferred_language": data.preferred_language,
        "city": data.city,
        "state": data.state,
        "type": "citizen",
        "role": "citizen",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    res = await db.users.insert_one(new_citizen)
    user_id = str(res.inserted_id)
    
    await log_audit_action(user_id, "CITIZEN_REGISTER", "users", user_id)
    
    token = create_access_token(user_id, "citizen", "citizen")
    return TokenResponse(access_token=token, user_type="citizen", role="citizen")

@router.post("/citizen/login", response_model=TokenResponse)
async def login_citizen(data: CitizenLoginRequest, db=Depends(get_db)):
    phone_hash = hash_identifier(data.phone)
    
    # In a real app, we'd verify the OTP here.
    if data.otp != "123456":
        raise HTTPException(status_code=401, detail="Invalid OTP")
        
    user = await db.users.find_one({"phone_hash": phone_hash, "type": "citizen"})
    if not user:
        raise HTTPException(status_code=404, detail="Citizen not found")
        
    user_id = str(user["_id"])
    await log_audit_action(user_id, "CITIZEN_LOGIN", "users", user_id)
    
    token = create_access_token(user_id, "citizen", "citizen")
    return TokenResponse(access_token=token, user_type="citizen", role="citizen")

@router.post("/government/login", response_model=TokenResponse)
async def login_government(data: GovernmentLoginRequest, db=Depends(get_db)):
    user = await db.users.find_one({"employee_id": data.employee_id, "type": "government"})
    if not user:
        raise HTTPException(status_code=404, detail="Government user not found")
        
    if not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    user_id = str(user["_id"])
    role = user["role"]
    
    await log_audit_action(user_id, "GOV_LOGIN", "users", user_id)
    
    token = create_access_token(user_id, role, "government")
    return TokenResponse(access_token=token, user_type="government", role=role)

@router.post("/logout")
async def logout(request: Request, payload: dict = Depends(get_current_user_payload)):
    token = request.state.token
    exp = payload.get("exp")
    
    if db_instance.redis_client and exp:
        # Calculate TTL for the blacklisted token
        now = datetime.utcnow().timestamp()
        ttl = int(exp - now)
        if ttl > 0:
            await db_instance.redis_client.setex(f"bl_{token}", ttl, "true")
            
    await log_audit_action(payload.get("sub"), "LOGOUT", "users", payload.get("sub"))
    return {"status": "success", "message": "Logged out successfully"}

@router.get("/me", response_model=UserMeResponse)
async def get_me(payload: dict = Depends(get_current_user_payload), db=Depends(get_db)):
    user_id = payload.get("sub")
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return UserMeResponse(
        id=str(user["_id"]),
        name=user["name"],
        user_type=user["type"],
        role=user["role"],
        city=user.get("city"),
        state=user.get("state"),
        department_id=user.get("department_id"),
        authority_id=user.get("authority_id")
    )
