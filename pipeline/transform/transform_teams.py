import pandas as pd
from config import generate_entity_id as id_gen

def transform_teams(teams_data: dict) -> pd.DataFrame:

    teams_df = pd.DataFrame(teams_data)

    # transform data
    teams_df['team_id'] = teams_df['name'].apply(lambda x: id_gen(x))

    return teams_df 