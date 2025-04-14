import pandas as pd
from sqlalchemy import create_engine, text
from config import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
from logs import export_df

def load_matches(matches_df: pd.DataFrame, delete: bool = False) -> bool:

    print('-----> Loading matches data', end='\n\n')

    db_url = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    engine = create_engine(db_url)

    if delete:
        with engine.connect() as connection:
            connection.execute(text("DELETE FROM matches CASCADE"))
            

    problematic_rows = []

    with engine.connect() as connection:
        for index, row in matches_df.iterrows():
            try:
                row_df = pd.DataFrame([row])
                row_df.to_sql("matches", connection, if_exists="append", index=False)
            except Exception as e:
                problematic_rows.append((index, row, str(e)))

            print(f'\tLoading match {index + 1}')

    if problematic_rows:
        problem_df = pd.DataFrame([row for index, row, error in problematic_rows])
        export_df(problem_df, 'problematic_matches_rows')
        
    print('-----> Finished loading matches data', end='\n\n')

    return True