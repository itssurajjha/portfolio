from sqlalchemy import create_engine
from app.config.settings import settings

engine = create_engine(settings.DATABASE_URL)

def run_query(query_name):
    try:
        with open(f"app/db/queries/{query_name}.sql") as f:
            query = f.read()
        with engine.connect() as conn:
            result = conn.execute(query)
            return [dict(row) for row in result]
    except Exception as e:
        return {"error": str(e)}
