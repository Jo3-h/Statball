"""
pipeline/main.py

Main file for the data integration pipeline. This file will be used to run the pipeline.

"""

# import statements
import os
import sys
import argparse as ap
from extract import *
from transform import *
from load import *
from logs import *
from config import *

def data_pipeline():

    # extract data
    teams_data = extract_teams()
    players_data = extract_players()
    matches_data = extract_matches()

    # export data
    export_dict(teams_data, 'teams')
    export_dict(players_data, 'players')
    export_dict(matches_data, 'matches')

    # transform data to dataframe
    teams_df = transform_teams(teams_data)
    players_df = transform_players(players_data)
    matches_df = transform_matches(matches_data)

    # extract stats data after match_id have been generated in transform_matches()
    stats_data = extract_stats(matches_df)
    export_dict(stats_data, 'stats')
    stats_df = transform_stats(stats_data)

    # export dataframe objects
    export_df(teams_df, 'teams')
    export_df(players_df, 'players')
    export_df(matches_df, 'matches')
    export_df(stats_df, 'stats')

    # load data to database
    load_teams(teams_df, delete=True)
    load_players(players_df, delete=True)
    load_matches(matches_df, delete=True)
    load_stats(stats_df, delete=True)

    return

def test_query():

    response = db_query("DELETE FROM teams")
    print(response)
    print("\n")
    response = db_query("SELECT * FROM teams")
    print(response)

    return

def main():

    # parse command line arguments
    parser = ap.ArgumentParser(description="Run the data integration pipeline or describe the database.")
    parser.add_argument('--action', type=str, choices=['pipeline', 'query'], required=True,
                        help="Specify 'pipeline' to run the full pipeline")
    args = parser.parse_args()

    if args.action == "pipeline":
        data_pipeline()
    elif args.action == "query":
        test_query()
    else:
        print('action not defined')

    return

if __name__ == "__main__":
    main()