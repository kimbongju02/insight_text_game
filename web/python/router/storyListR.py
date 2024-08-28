from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import os

from func import loadStory

router = APIRouter(
    prefix="/list"
)

# 템플릿 경로 설정
template = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "../../html"))

@router.get('/')
async def novel_list(request: Request):
    return template.TemplateResponse("storyList.html", {"request": request})

@router.get('/get_story_list')
async def get_story(request: Request):
    data = loadStory.load_all_novel_data()
    return {"data": data}
