from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    language = Column(String(50), nullable=False)

    code = Column(Text, nullable=False)

    review = Column(Text, nullable=False)

    score = Column(Integer, default=0)

    bugs = Column(Integer, default=0)

    security_score = Column(Integer, default=0)

    performance_score = Column(Integer, default=0)

    quality_score = Column(Integer, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="reviews"
    )
