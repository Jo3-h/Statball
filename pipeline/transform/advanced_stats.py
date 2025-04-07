import pandas as pd
from sqlalchemy import create_engine, text
from config import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

def advanced_stats() -> None:

    db_url = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    engine = create_engine(db_url)

    # query the database for normal stats
    query = "SELECT * FROM match_player_stats"
    stats_df = pd.read_sql(query, engine)

    # calculate advanced game scores
    stats_df['game_score'] = (
        10 * stats_df['goals']
        + 2 * stats_df['behinds']
        + 2 * stats_df['kicks']
        + 1 * stats_df['handballs']
        + 3 * stats_df['tackles'] 
        + 4 * stats_df['marks']
        + 0.5 * stats_df['hitouts']
        + 3 * stats_df['clearances']
        - 2 * stats_df['free_kicks_against']
        - 4 * stats_df['goals_against']
        - 1 * stats_df['clangers']
        + 0.5 * stats_df['bounces']
        + 0.5 * stats_df['one_percenters']
    )

    # calculate adjusted game_score
    stats_df['adjusted_game_score'] = stats_df['game_score'] * 100 / stats_df['percentage_of_game_played']



    return