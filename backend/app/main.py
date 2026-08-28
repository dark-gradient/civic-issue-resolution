from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import connect_to_mongo, close_mongo_connection, connect_to_redis, close_redis_connection
from app.routers.api import (
    auth_router, users_router, reports_router, issues_router,
    departments_router, authorities_router, assignments_router,
    resolutions_router, notifications_router, dashboard_router, analytics_router, export_router
)
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    await connect_to_redis()
    yield
    await close_mongo_connection()
    await close_redis_connection()

app = FastAPI(title="Civic Issue Reporting API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*", # Allow any origin for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reports_router)
app.include_router(issues_router)
app.include_router(departments_router)
app.include_router(authorities_router)
app.include_router(assignments_router)
app.include_router(resolutions_router)
app.include_router(notifications_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(export_router)

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected"
    }
