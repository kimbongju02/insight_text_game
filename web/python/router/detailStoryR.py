from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import os
from fastapi.staticfiles import StaticFiles
from func import loadStory

router = APIRouter(
    prefix="/detail"
)
template = Jinja2Templates(directory="../html")

@router.get('/story/{id}')
async def story_page(request: Request, id: str):
    return template.TemplateResponse("detailStory.html", {"request": request})

@router.get('/make/{id}')
async def make_page(request: Request, id: str):
    return template.TemplateResponse("makeStory.html", {"request": request})

@router.get('/info/{id}')
async def make_page(request: Request, id: int):
    data = loadStory.load_novel_data(id)
    return {"data": data}