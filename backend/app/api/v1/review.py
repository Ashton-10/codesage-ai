from fastapi import APIRouter

router = APIRouter(
    prefix="/review",
    tags=["Review"]
)


@router.get("/")
def review_home():
    return {
        "message": "Review API is working!"
    }