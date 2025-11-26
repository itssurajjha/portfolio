from pydantic import BaseModel

class DashboardBase(BaseModel):
    title: str
    description: str = None
    tools_used: str = None
    dashboard_link: str = None
    category: str = None    # e.g. Sales / HR / Finance / Custom

class DashboardCreate(DashboardBase):
    pass

class Dashboard(DashboardBase):
    id: int

    class Config:
        from_attributes = True
