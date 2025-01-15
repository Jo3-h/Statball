"""
pipeline/config/congif.py

Configuration file for the data integration pipeline.
"""

# General configuration 
TESTING = True
VERBOSE = False

# configuration for log files and variables
LOG_FILE = "logs/etl_pipeline.log"
LOG_DIR = "logs/test_files"

# configuration for urls for data extraction
TEAMS_URL = "https://afltables.com/afl/teams/allteams/overall_wl.html"
PLAYERS_URL = "https://afltables.com/afl/stats/2024.html#1"