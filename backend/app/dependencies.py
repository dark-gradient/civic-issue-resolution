from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
import jwt
from typing import Dict, Any, List
from app.config import settings
from app.database import get_db, db_instance

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/government/login")

def get_database():
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    return db

async def get_current_user_payload(request: Request, token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Check if token is blacklisted in Redis (Logout)
    if db_instance.redis_client:
        is_blacklisted = await db_instance.redis_client.get(f"bl_{token}")
        if is_blacklisted:
            raise credentials_exception

    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        if payload.get("sub") is None or payload.get("role") is None or payload.get("type") is None:
            raise credentials_exception
        
        # Store token on request state for logout
        request.state.token = token
        
        return payload
    except jwt.PyJWTError:
        raise credentials_exception

def require_roles(allowed_roles: List[str]):
    async def role_checker(payload: Dict[str, Any] = Depends(get_current_user_payload)):
        if payload.get("role") not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return payload
    return role_checker

async def get_current_citizen(payload: Dict[str, Any] = Depends(get_current_user_payload)):
    if payload.get("type") != "citizen":
        raise HTTPException(status_code=403, detail="Not authorized as citizen")
    return payload

async def get_current_government_user(payload: Dict[str, Any] = Depends(get_current_user_payload)):
    if payload.get("type") != "government":
        raise HTTPException(status_code=403, detail="Not authorized as government user")
    return payload
