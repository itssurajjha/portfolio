from fastapi import APIRouter
from app.services.sql_service import run_query

router = APIRouter()

@router.post("/")
def execute_sql(query_name: str):
    return run_query(query_name)
