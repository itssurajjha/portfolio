from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers.admin_router import router as admin_router
from app.routers.projects_router import router as projects_router

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- ADD THIS LINE ---
from app.models import project_model 
# ---------------------
from fastapi.staticfiles import StaticFiles

from app.utils.database import Base, engine # Updated path
# ... rest of your imports
# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Suraj Jha Portfolio Backend",
    description="Backend API for managing portfolio projects, admin, uploads, analytics",
    version="1.0.0"
)

# ====== CORS SETTINGS ======
origins = [
    
    "https://itssurajjha.github.io",
    "https://itssurajjha.vercel.app",
    "https://portfolio-itssurajjha.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== ROUTES ======
app.include_router(admin_router)
app.include_router(projects_router, prefix="/projects", tags=["Projects"])

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Portfolio Backend is Running Successfully!",
        "docs": "/docs",
        "admin_panel": "Use the frontend admin UI",
    }
