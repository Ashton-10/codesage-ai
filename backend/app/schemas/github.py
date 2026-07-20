from pydantic import BaseModel


class GithubReviewRequest(BaseModel):
    title: str
    repo_url: str


class GithubReviewResponse(BaseModel):
    review: str