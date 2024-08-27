from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter(
    prefix="/detail",
)

template = Jinja2Templates(directory="../html")

@router.get('/story/{id}')
async def story_page(request: Request, id: str):
    return template.TemplateResponse("detailStory.html", {"request": request})

@router.get('/make/{id}')
async def make_page(request: Request, id: str):
    return template.TemplateResponse("makeStory.html", {"request": request})