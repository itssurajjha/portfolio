from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import projects, dashboards, ml, sql

app = FastAPI(
    title="Portfolio Analytics API",
    version="1.0.0",
    description="Backend for portfolio analytics and ML apps"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change to specific domain during production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Backend running successfully!"}

# API Routes
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(dashboards.router, prefix="/api/dashboards", tags=["Dashboards"])
app.include_router(ml.router, prefix="/ml", tags=["ML Model"])
app.include_router(sql.router, prefix="/api/sql", tags=["SQL Queries"])
