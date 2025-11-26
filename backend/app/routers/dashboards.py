from fastapi import APIRouter, HTTPException
from app.schemas.dashboard_schema import Dashboard, DashboardCreate
from app.services.dashboard_service import (
    get_all_dashboard,
    create_dashboard,
    get_dashboard_by_id
)

router = APIRouter()

@router.get("/", response_model=list[Dashboard])
def list_dashboards():
    return get_all_dashboard()

@router.post("/", response_model=Dashboard)
def add_dashboard(dashboard: DashboardCreate):
    return create_dashboard(dashboard)

@router.get("/{dashboard_id}", response_model=Dashboard)
def get_dashboard(dashboard_id: int):
    dashboard = get_dashboard_by_id(dashboard_id)
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    return dashboard
