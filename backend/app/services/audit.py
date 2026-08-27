from datetime import datetime
from app.database import get_db

async def log_audit_action(user_id: str, action: str, target_resource: str, target_id: str):
    db = get_db()
    if db is not None:
        log_entry = {
            "user_id": user_id,
            "action": action,
            "target_resource": target_resource,
            "target_id": target_id,
            "timestamp": datetime.utcnow()
        }
        await db.audit_logs.insert_one(log_entry)
