import pandas as pd
from datetime import timedelta
from config import generate_entity_id

def age_to_timedelta(age_str):
    if isinstance(age_str, str):
        age_str = age_str.replace(')', '').replace('d', '').replace('y', '')
        years, days = map(int, age_str.split(' '))
        return timedelta(days=(years * 365) + days)
    return timedelta(0) 

def transform_players(players_data: dict) -> pd.DataFrame:

    players_df = pd.DataFrame(players_data)

    # Strip leading and trailing whitespace from all entries
    players_df = players_df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    # clean data-of-birth data
    players_df['born'] = players_df['born'].str.extract(r'(\d{1,2}-\w{3}-\d{4})')[0]
    players_df['born'] = pd.to_datetime(players_df['born'], format='%d-%b-%Y', errors='coerce')

    # normalize player debut and last to timedelta    
    players_df['debut_age'] = players_df['debut'].str.extract(r'(\d+y \d+d)')[0]
    players_df['last_age'] = players_df['last'].str.extract(r'(\d+y \d+d)')[0]
    players_df['debut'] = players_df.apply(lambda row: row['born'] + age_to_timedelta(row['debut_age']), axis=1)
    players_df['last'] = players_df.apply(lambda row: row['born'] + age_to_timedelta(row['last_age']), axis=1)

    # normalize height and weight data
    players_df['height'] = players_df['height'].str.extract(r'(\d+)')
    players_df['height'] = players_df['height'].fillna(0).astype(int)
    players_df['weight'] = players_df['weight'].str.extract(r'(\d+)')[0]
    players_df['weight'] = players_df['weight'].fillna(0).astype(int)

    # type cast player number to int
    players_df['number'] = players_df['number'].astype(int)

    # generate team_id to use as FOREIGN KEY
    players_df['team_id'] = players_df['team'].apply(lambda x: generate_entity_id(x))

    # generate player_id to use as PRIMARY KEY
    players_df['player_id_seed'] = players_df['name'] + players_df['team'] + players_df['number'].astype(str)
    players_df['player_id'] = players_df['player_id_seed'].apply(lambda x: generate_entity_id(x))
    players_df.drop(columns=['player_id_seed', 'team'], inplace=True)

    return players_df