from app.db.database import Base, engine
import app.db.base
from fastapi import FastAPI
from app.api.v1.router import router
from app.core.settings import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered code review platform"
)

app.include_router(router)


@app.get("/", tags=["Home"])
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} 🚀"
    }