import pandas as pd
from config import generate_entity_id

def replace_non_breaking_space(data):
    for key, value in data.items():
        if value == "\u00a0":
            data[key] = "0"
    return data

def transform_stats(stats_data: dict) -> pd.DataFrame:

    print('-----> Transforming stats data', end='\n\n')

    stats_data = [replace_non_breaking_space(data) for data in stats_data]
    stats_df = pd.DataFrame(stats_data)

    # transform data
    stats_df['stat_id'] = stats_df['match_id'].astype(str) + stats_df['player_id'].astype(str)
    stats_df['stat_id'] = stats_df['stat_id'].apply(lambda x: generate_entity_id(x))

    # type cast columns to int
    stats_df = stats_df.fillna(0).astype(int)
    
    print('-----> Finished transforming stats data\n')

    return stats_df