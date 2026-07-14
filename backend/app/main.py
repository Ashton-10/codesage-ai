from fastapi import FastAPI
app = FastAPI(
    title="CodeSage AI",
    description ="AI-powered code review platform",
    version="1.0.0"
)
@app.get("/")
def root():
    return{
        "message":"welcome to CodeSage AI"
    }
@app.get("/health")
def health():
    return{
        "Status":"healthy"
    }