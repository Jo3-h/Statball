"""
pipeline/main.py

Main file for the data integration pipeline. This file will be used to run the pipeline.

"""

# import statements
import os
import sys
import argparse as ap

def main():

    # parse command line arguments
    parser = ap.ArgumentParser(description="Run the Statball data integration pipeline.")
    parser.add_argument("--config", type=str, help="Path to the configuration file.")

    args = parser.parse_args()

    return

if __name__ == "__main__":
    main()