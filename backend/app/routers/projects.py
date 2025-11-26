from fastapi import APIRouter, HTTPException
from app.schemas.project_schema import Project, ProjectCreate
from app.services.project_service import (
    get_all_projects,
    create_project,
    get_project_by_id
)

router = APIRouter()

@router.get("/", response_model=list[Project])
def list_projects():
    return get_all_projects()

@router.post("/", response_model=Project)
def add_project(project: ProjectCreate):
    return create_project(project)

@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int):
    project = get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
