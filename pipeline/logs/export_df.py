from config import LOG_DIR
import pandas as pd
import os

def export_df(df: pd.DataFrame, name: str):
    """
    Writes a DataFrame to a specified file in the 'logs' directory.
    """
    if df.empty:
        return None
    
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    with open(f'{LOG_DIR}/{name}.df', 'w') as file:
        file.write(df.to_string(index=False, col_space=20, justify='left'))


    return