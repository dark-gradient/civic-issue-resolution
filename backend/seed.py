import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings
from app.utils.security import get_password_hash, hash_identifier
from datetime import datetime

async def seed_users():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.MONGODB_DATABASE]
    
    print("Clearing existing users...")
    await db.users.delete_many({})

    # 1. Citizen
    citizen_phone = "9999999999"
    citizen_phone_hash = hash_identifier(citizen_phone)
    
    citizen = {
        "name": "Sathyendhar B",
        "phone_hash": citizen_phone_hash,
        "identity_verification_status": "verified",
        "preferred_language": "en",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "citizen",
        "role": "citizen",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await db.users.insert_one(citizen)
    print(f"Created Citizen: Sathyendhar B (Phone: PROTECTED)")

    # Government accounts
    gov_roles = [
        {"name": "Demo Municipal Officer", "employee_id": "GOV001", "role": "department_officer"},
        {"name": "Municipal Admin", "employee_id": "GOV002", "role": "municipal_admin"},
        {"name": "Roads Supervisor", "employee_id": "GOV003", "role": "supervisor"},
        {"name": "Field Staff", "employee_id": "GOV004", "role": "field_staff"},
        {"name": "Analyst", "employee_id": "GOV005", "role": "analyst"}
    ]
    
    default_password = "password123"
    hashed_password = get_password_hash(default_password)
    
    for gov in gov_roles:
        gov_user = {
            "name": gov["name"],
            "employee_id": gov["employee_id"],
            "hashed_password": hashed_password,
            "role": gov["role"],
            "type": "government",
            "department_id": "DEP123",
            "authority_id": "AUTH123",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await db.users.insert_one(gov_user)
        print(f"Created Government User: {gov['name']} (Emp ID: {gov['employee_id']}, Password: PROTECTED)")

    # Authorities
    await db.authorities.delete_many({})
    auths = [
        {"name": "Greater Chennai Corporation", "state": "Tamil Nadu", "city": "Chennai"},
        {"name": "Chennai Metropolitan Water Supply and Sewerage Board", "state": "Tamil Nadu", "city": "Chennai"},
        {"name": "Bruhat Bengaluru Mahanagara Palike", "state": "Karnataka", "city": "Bengaluru"},
        {"name": "Brihanmumbai Municipal Corporation", "state": "Maharashtra", "city": "Mumbai"},
        {"name": "New Delhi Municipal Council", "state": "Delhi", "city": "New Delhi"}
    ]
    await db.authorities.insert_many(auths)
    print("Created authorities.")

    # Departments
    await db.departments.delete_many({})
    deps = [
        {"name": "Roads", "authority_id": "AUTH_GCC"},
        {"name": "Sanitation", "authority_id": "AUTH_GCC"},
        {"name": "Electrical", "authority_id": "AUTH_GCC"},
        {"name": "Water", "authority_id": "AUTH_CMWSSB"},
        {"name": "Parks", "authority_id": "AUTH_GCC"}
    ]
    await db.departments.insert_many(deps)
    print("Created departments.")

    # Dummy Civic Issues
    await db.civic_issues.delete_many({})
    dummy_issues = [
        {
            "title": "Huge Pothole on Anna Salai",
            "type": "Pothole",
            "originalLanguage": "en",
            "originalDescription": "There is a huge pothole causing traffic jams.",
            "description": "There is a huge pothole causing traffic jams.",
            "location": "Anna Salai, Chennai",
            "city": "Chennai",
            "state": "Tamil Nadu",
            "authority": "Greater Chennai Corporation",
            "department": "Roads",
            "priority": "High",
            "status": "Submitted",
            "lat": 13.0604,
            "lng": 80.2496,
            "geo_location": {"type": "Point", "coordinates": [80.2496, 13.0604]},
            "reportedAt": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "timeline": [
                {
                    "id": f"t-{datetime.utcnow().timestamp()}",
                    "status": "SUBMITTED",
                    "timestamp": datetime.utcnow(),
                    "actor": "System",
                    "notes": "Issue reported and automatically routed."
                }
            ],
            "reportsCount": 3,
            "images": {"before": "/uploads/dummy.jpg"}
        }
    ]
    await db.civic_issues.insert_many(dummy_issues)
    print("Created dummy civic issues.")

    print("Seeding complete.")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_users())
