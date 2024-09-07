from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import os

router = APIRouter()
template = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "../../html"))

@router.get('/user/story')
async def story_page(request: Request):
    return template.TemplateResponse("gamePage.html", {"request": request})

@router.get('/local/story/{id}')
async def story_local_page(request: Request, id: int):
    return template.TemplateResponse("gamePage.html", {"request": request})
