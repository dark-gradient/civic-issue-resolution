from motor.motor_asyncio import AsyncIOMotorClient
import redis.asyncio as redis
from app.config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None
    redis_client = None

db_instance = Database()

async def connect_to_mongo():
    db_instance.client = AsyncIOMotorClient(settings.MONGODB_URI)
    db_instance.db = db_instance.client[settings.MONGODB_DATABASE]
    
    # Initialize geo indexes
    await db_instance.db.reports.create_index([("location", "2dsphere")])
    await db_instance.db.civic_issues.create_index([("location", "2dsphere")])
    
    print("Connected to MongoDB and created 2dsphere indexes.")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        print("Closed MongoDB connection.")

async def connect_to_redis():
    try:
        db_instance.redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
        await db_instance.redis_client.ping()
        print("Connected to Redis.")
    except Exception as e:
        print(f"Failed to connect to Redis: {e}")

async def close_redis_connection():
    if db_instance.redis_client:
        await db_instance.redis_client.close()
        print("Closed Redis connection.")

def get_db():
    return db_instance.db
