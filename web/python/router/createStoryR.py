from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
import os

router = APIRouter(
    prefix="/create"
)
template = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "../../html"))

@router.get('/story')
async def story_page(request: Request):
    return template.TemplateResponse("createStory.html", {"request": request})
