from fastapi import APIRouter
from app.routers.auth import router as auth_router_real
from app.routers.dashboard import router as dashboard_router_real
from app.routers.reports import router as reports_router_real
from app.routers.issues import router as issues_router_real
from app.routers.departments import router as departments_router_real
from app.routers.departments import authorities_router as authorities_router_real

auth_router = APIRouter(prefix="/api/auth", tags=["auth"])
auth_router.include_router(auth_router_real)

dashboard_router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])
dashboard_router.include_router(dashboard_router_real)

reports_router = APIRouter(prefix="/api/reports", tags=["reports"])
reports_router.include_router(reports_router_real)

issues_router = APIRouter(prefix="/api/issues", tags=["issues"])
issues_router.include_router(issues_router_real)

departments_router = APIRouter(prefix="/api/departments", tags=["departments"])
departments_router.include_router(departments_router_real)

authorities_router = APIRouter(prefix="/api/authorities", tags=["authorities"])
authorities_router.include_router(authorities_router_real)

users_router = APIRouter(prefix="/api/users", tags=["users"])
assignments_router = APIRouter(prefix="/api/assignments", tags=["assignments"])
resolutions_router = APIRouter(prefix="/api/resolutions", tags=["resolutions"])
notifications_router = APIRouter(prefix="/api/notifications", tags=["notifications"])
analytics_router = APIRouter(prefix="/api/analytics", tags=["analytics"])
from app.routers.analytics import router as analytics_router_real
analytics_router.include_router(analytics_router_real)

export_router = APIRouter(prefix="/api/export", tags=["export"])
from app.routers.export import router as export_router_real
export_router.include_router(export_router_real)
