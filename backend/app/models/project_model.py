from pydantic import BaseModel

# Simple in-memory model for now (you can upgrade to DB later)
class Project(BaseModel):
    id: int
    title: str
    description: str | None = None
    tools_used: str | None = None
    github_link: str | None = None
    dashboard_link: str | None = None
