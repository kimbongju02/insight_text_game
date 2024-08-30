import uvicorn
from fastapi import FastAPI, Request, Response, APIRouter
from starlette.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

import os

from router import detailStoryR, storyListR, createStoryR

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

app.include_router(detailStoryR.router)
app.include_router(storyListR.router)
app.include_router(createStoryR.router)

templates = Jinja2Templates(directory="../html")

app.mount("/img", StaticFiles(directory="../static/img"), name="img")
app.mount("/css", StaticFiles(directory="../static/css"), name="css")
app.mount("/list", StaticFiles(directory="../static"), name="list")
app.mount("/detail/story", StaticFiles(directory="../static"), name="detail")
app.mount("/create", StaticFiles(directory="../static"), name="create")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("mainPage.html", {"request": request})

