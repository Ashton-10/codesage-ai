from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.review import Review


def get_dashboard(db: Session, user_id: int):
    total_reviews = db.query(Review).filter(
        Review.user_id == user_id
    ).count()

    python_reviews = db.query(Review).filter(
        Review.user_id == user_id,
        func.lower(Review.language) == "python"
    ).count()

    java_reviews = db.query(Review).filter(
        Review.user_id == user_id,
        func.lower(Review.language) == "java"
    ).count()

    cpp_reviews = db.query(Review).filter(
        Review.user_id == user_id,
        func.lower(Review.language).in_(["cpp", "c++"])
    ).count()

    latest = (
        db.query(Review)
        .filter(Review.user_id == user_id)
        .order_by(Review.created_at.desc())
        .first()
    )

    return {
        "total_reviews": total_reviews,
        "python_reviews": python_reviews,
        "java_reviews": java_reviews,
        "cpp_reviews": cpp_reviews,
        "latest_review": latest.title if latest else None
    }