from sqlalchemy.orm import Session

from app.models.review import Review


def get_review_history(db: Session, user_id: int):
    return (
        db.query(Review)
        .filter(Review.user_id == user_id)
        .order_by(Review.created_at.desc())
        .all()
    )


def get_review_by_id(db: Session, review_id: int, user_id: int):
    return (
        db.query(Review)
        .filter(
            Review.id == review_id,
            Review.user_id == user_id
        )
        .first()
    )
def delete_review(db: Session, review_id: int, user_id: int):
    review = (
        db.query(Review)
        .filter(
            Review.id == review_id,
            Review.user_id == user_id
        )
        .first()
    )

    if review is None:
        return None

    db.delete(review)
    db.commit()

    return review

from sqlalchemy import or_

from app.models.review import Review


def search_reviews(
    db,
    user_id: int,
    query: str
):
    return (
        db.query(Review)
        .filter(
            Review.user_id == user_id,
            or_(
                Review.title.ilike(f"%{query}%"),
                Review.language.ilike(f"%{query}%"),
                Review.code.ilike(f"%{query}%")
            )
        )
        .order_by(Review.created_at.desc())
        .all()
    )