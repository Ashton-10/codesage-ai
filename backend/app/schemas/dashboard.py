from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_reviews: int
    python_reviews: int
    java_reviews: int
    cpp_reviews: int
    latest_review: str | None