from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os

from func import loadStory

router = APIRouter(
)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
public_directory = os.path.join(BASE_DIR, '..\\..\\static')
template = Jinja2Templates(directory="../html")
router.mount("/static", StaticFiles(directory=public_directory), name="static")

@router.get('/list')
async def novel_list(request: Request):
    return template.TemplateResponse("storyList.html", {"request": request})

@router.get('/get_story_list')
async def get_story(request: Request):
    data = loadStory.load_all_novel_data()
    return {"data": data}