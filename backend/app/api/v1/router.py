from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.review import router as review_router
from app.api.v1.dashboard import router as dashboard_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(review_router)
router.include_router(dashboard_router)