"""
pipeline/config/congif.py

Configuration file for the data integration pipeline.
"""
from dotenv import load_dotenv
import os

load_dotenv()

# General configuration 
TESTING = True
VERBOSE = False

# configuration for log files and variables
LOG_FILE = "logs/etl_pipeline.log"
LOG_DIR = "logs/test_files"

# configuration for urls for data extraction
TEAMS_URL = "https://afltables.com/afl/teams/allteams/overall_wl.html"
PLAYERS_URL = "https://afltables.com/afl/stats/2024.html#1"

# configuration for database connection
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = "5432"
DB_NAME = "Statball DB"