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
    allow_origins=[os.getenv('FRONTEND_URL', 'https://civic-frontend.onrender.com')],
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


@app.get("/")
async def root():
    return {
        "message": "Civic Issue Reporting API is running",
        "status": "online",
        "docs_url": "/docs"
    }

from typing import List, Dict, Any
from fastapi import Depends, Request
from app.database import get_db
from datetime import datetime

@app.post("/api/internal/seed")
async def seed_data(request: Request, db=Depends(get_db)):
    issues = await request.json()
    for issue in issues:
        if '_id' in issue: del issue['_id']
        if 'id' in issue: del issue['id']
        
        
    if issues:
        await db.civic_issues.insert_many(issues)
    return {"status": "seeded", "count": len(issues)}

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected"
    }
