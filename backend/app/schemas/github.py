from pydantic import BaseModel


class GithubReviewRequest(BaseModel):
    title: str
    repo_url: str


class GithubReviewResponse(BaseModel):
    score: int
    bugs: int
    security_score: int
    performance_score: int
    quality_score: int
    review: str