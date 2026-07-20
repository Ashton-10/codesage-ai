from pydantic import BaseModel


class UploadResponse(BaseModel):
    review: str