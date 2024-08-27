import uvicorn
from fastapi import FastAPI, Request, Response, APIRouter
from starlette.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from router import detailStoryR, storyListR

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="../html")
app.mount("/static", StaticFiles(directory="../static"), name="static")


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("mainPage.html", {"request": request})

app.include_router(detailStoryR.router)
app.include_router(storyListR.router)