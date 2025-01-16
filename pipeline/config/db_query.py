import pandas as pd
from sqlalchemy import create_engine, text
from config import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

def db_query(query: str) -> pd.DataFrame:
    """
    Execute a query on the database and return the result as a DataFrame
    """
    db_url = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    engine = create_engine(db_url)
    with engine.connect() as connection:
        result = connection.execute(text(query))
        connection.commit()
        if result.returns_rows:
            return pd.DataFrame(result.fetchall(), columns=result.keys())
        else:
            connection.commit()
            return pd.DataFrame()