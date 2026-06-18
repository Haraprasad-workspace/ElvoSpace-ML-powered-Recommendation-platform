from fastapi import FastAPI
from routes.Recommend import router

app = FastAPI(
    title = "ElvoSpace Recommendation Engine",
    version = "1.0"
)

app.include_router(router)

@app.get("/")
def home():
    return{
        "message":"Recommendation API running"
    }