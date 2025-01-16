import pandas as pd
from config import generate_entity_id

def transform_matches(matches_data: dict) -> pd.DataFrame:

    matches_df = pd.DataFrame(matches_data)

    # Strip leading and trailing whitespace from all entries
    matches_df = matches_df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    # typecast int columns
    matches_df['round'] = matches_df['round'].apply(lambda x: x.split(' ')[1]).astype(int)
    matches_df['date'] = matches_df['date'].apply(lambda x: ' '.join(x.split()[:2]))
    matches_df['date'] = pd.to_datetime(matches_df['date'], format='%a %d-%b-%Y')
    matches_df['home_score'] = matches_df['home_score'].astype(int)
    matches_df['away_score'] = matches_df['away_score'].astype(int)

    # generate match_id to use as PRIMARY KEY
    matches_df['match_id_seed'] = matches_df['date'].astype(str) + matches_df['round'].astype(str) + matches_df['home_team'] + matches_df['away_team']
    matches_df['match_id'] = matches_df['match_id_seed'].apply(lambda x: generate_entity_id(x))
    matches_df.drop(columns=['match_id_seed'], inplace=True)

    # generate home/away team_id to use as FOREIGN KEY
    matches_df['home_team_id'] = matches_df['home_team'].apply(lambda x: generate_entity_id(x))
    matches_df['away_team_id'] = matches_df['away_team'].apply(lambda x: generate_entity_id(x))
    matches_df.drop(columns=['home_team', 'away_team'], inplace=True)

    # create column for home_win
    matches_df['home_win'] = (matches_df['home_score'] > matches_df['away_score']).astype(bool)

    return matches_df