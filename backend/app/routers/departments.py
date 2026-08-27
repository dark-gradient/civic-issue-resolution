from fastapi import APIRouter, Depends
from app.database import get_db

router = APIRouter()
authorities_router = APIRouter()

@router.get("/")
async def get_departments(db=Depends(get_db)):
    cursor = db.departments.find({})
    deps = await cursor.to_list(length=100)
    for d in deps:
        d["id"] = str(d.pop("_id"))
    return deps

@authorities_router.get("")
async def get_authorities(db=Depends(get_db)):
    cursor = db.authorities.find({})
    auths = await cursor.to_list(length=100)
    for a in auths:
        a["id"] = str(a.pop("_id"))
    return auths
