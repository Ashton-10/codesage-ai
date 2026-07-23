from fastapi import APIRouter, Depends, HTTPException
from app.services.github import clone_and_read_repo
from app.schemas.github import GithubReviewRequest
from app.schemas.upload import UploadResponse
from fastapi import UploadFile, File, Form
from fastapi.responses import StreamingResponse
from app.services.pdf import generate_review_pdf
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.github import (
    GithubReviewRequest,
    GithubReviewResponse,
)
from app.services.github import clone_and_read_repo

from app.schemas.review import (
    ReviewRequest,
    ReviewResponse,
    ReviewHistory
)

from app.services.gemini import review_code
from app.services.review import save_review
from app.services.history import (
    get_review_history,
    get_review_by_id,
    delete_review,
    search_reviews
)

from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/review",
    tags=["AI Review"]
)
@router.post("/github", response_model=GithubReviewResponse)
def review_github(
    request: GithubReviewRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        code = clone_and_read_repo(request.repo_url)

        result = review_code(
            language="repository",
            code=code
        )

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable.\n{str(e)}"
        )

    save_review(
        db=db,
        user_id=current_user.id,
        title=request.title,
        language="repository",
        code=code,
        review=result["review"],
        score=result["score"],
        bugs=result["bugs"],
        security_score=result["security_score"],
        performance_score=result["performance_score"],
        quality_score=result["quality_score"],
    )

    return GithubReviewResponse(
        score=result["score"],
        bugs=result["bugs"],
        security_score=result["security_score"],
        performance_score=result["performance_score"],
        quality_score=result["quality_score"],
        review=result["review"],
    )
@router.post("/upload", response_model=UploadResponse)
async def upload_review(
    title: str = Form(...),
    language: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        code = (await file.read()).decode("utf-8")

        result = review_code(
            language,
            code
        )

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable.\n{str(e)}"
        )

    save_review(
        db=db,
        user_id=current_user.id,
        title=title,
        language=language,
        code=code,
        review=result["review"],
        score=result["score"],
        bugs=result["bugs"],
        security_score=result["security_score"],
        performance_score=result["performance_score"],
        quality_score=result["quality_score"],
    )

    return UploadResponse(
        review=result["review"]
    )

@router.post("/", response_model=ReviewResponse)
def review(
    request: ReviewRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        result = review_code(
            request.language,
            request.code
        )
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable.\n{str(e)}"
        )

    save_review(
        db=db,
        user_id=current_user.id,
        title=request.title,
        language=request.language,
        code=request.code,
        review=result["review"],
        score=result["score"],
        bugs=result["bugs"],
        security_score=result["security_score"],
        performance_score=result["performance_score"],
        quality_score=result["quality_score"],
    )

    return ReviewResponse(
        score=result["score"],
        bugs=result["bugs"],
        security_score=result["security_score"],
        performance_score=result["performance_score"],
        quality_score=result["quality_score"],
        review=result["review"],
    )

@router.get("/history", response_model=list[ReviewHistory])
def review_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_review_history(db, current_user.id)

@router.get("/search", response_model=list[ReviewHistory])
def search(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return search_reviews(
        db,
        current_user.id,
        query
    )
@router.get("/{review_id}", response_model=ReviewHistory)
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    review = get_review_by_id(
        db,
        review_id,
        current_user.id
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review
@router.get("/{review_id}/pdf")
def download_review_pdf(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    review = get_review_by_id(
        db,
        review_id,
        current_user.id
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    pdf = generate_review_pdf(review)

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=review_{review_id}.pdf"
        }
    )

@router.delete("/{review_id}")
def remove_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    review = delete_review(
        db,
        review_id,
        current_user.id
    )

    if review is None:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return {
        "message": "Review deleted successfully"
    }