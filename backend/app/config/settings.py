import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Analytics Portfolio Backend"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")
    MODEL_PATH: str = "app/models/ml_model.pkl"

    class Config:
        env_file = ".env"

settings = Settings()

