from app.schemas.dashboard_schema import Dashboard, DashboardCreate

# Temporary in-memory "DB"
fake_dashboard_db = []

def get_all_dashboard():
    return fake_dashboard_db

def create_dashboard(data: DashboardCreate):
    new_id = len(fake_dashboard_db) + 1
    dashboard = Dashboard(id=new_id, **data.dict())
    fake_dashboard_db.append(dashboard)
    return dashboard

def get_dashboard_by_id(dashboard_id: int):
    for item in fake_dashboard_db:
        if item.id == dashboard_id:
            return item
    return None
