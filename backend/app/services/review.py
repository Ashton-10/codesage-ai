from sqlalchemy.orm import Session

from app.models.review import Review


def save_review(
    db: Session,
    user_id: int,
    title: str,
    language: str,
    code: str,
    review: str,
    score: int,
    bugs: int,
    security_score: int,
    performance_score: int,
    quality_score: int,
):
    db_review = Review(
        user_id=user_id,
        title=title,
        language=language,
        code=code,
        review=review,
        score=score,
        bugs=bugs,
        security_score=security_score,
        performance_score=performance_score,
        quality_score=quality_score,
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review