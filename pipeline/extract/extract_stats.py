import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
from config import generate_entity_id, TESTING

def extract_stats(matches_data: pd.DataFrame) -> list:

    stats_data = []

    if TESTING: 
        matches_data = matches_data.head(5)

    for _, match in matches_data.iterrows():

        url = match['stats_link']
        url = url.replace('..', 'https://afltables.com/afl/')
        response = requests.get(url)

        print(f"Extracting stats for match from {url}", end='\t')
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            continue

        soup = bs(response.text, 'html.parser')

        tables = soup.find_all('table')

        # extract the home team stats
        try:
            team_name = tables[2].find('th').text.split(' Match')[0]
        except:
            if TESTING:
                print('Error: ', url)
        try:
            for row in tables[2].find('tbody').find_all('tr'):
                player_stats = {}
                try:
                    player_number = row.find_all('td')[0].text.split(' ')[0]
                    player_name = row.find_all('td')[1].text
                    player_stats['player_id'] = generate_entity_id(player_name + team_name + player_number)
                    player_stats['match_id'] = match['match_id']

                    # extract player stats
                    player_stats['kicks'] = row.find_all('td')[2].text
                    player_stats['marks'] = row.find_all('td')[3].text
                    player_stats['handballs'] = row.find_all('td')[4].text
                    player_stats['disposals'] = row.find_all('td')[5].text
                    player_stats['goals'] = row.find_all('td')[6].text
                    player_stats['behinds'] = row.find_all('td')[7].text
                    player_stats['hitouts'] = row.find_all('td')[8].text
                    player_stats['tackles'] = row.find_all('td')[9].text
                    player_stats['rebound_50s'] = row.find_all('td')[10].text
                    player_stats['inside_50s'] = row.find_all('td')[11].text
                    player_stats['clearances'] = row.find_all('td')[12].text
                    player_stats['clangers'] = row.find_all('td')[13].text
                    player_stats['free_kicks_for'] = row.find_all('td')[14].text
                    player_stats['free_kicks_against'] = row.find_all('td')[15].text
                    player_stats['brownlow_votes'] = row.find_all('td')[16].text
                    player_stats['contested_possessions'] = row.find_all('td')[17].text
                    player_stats['uncontested_possessions'] = row.find_all('td')[18].text
                    player_stats['contested_marks'] = row.find_all('td')[19].text
                    player_stats['marks_inside_50'] = row.find_all('td')[20].text
                    player_stats['one_percenters'] = row.find_all('td')[21].text
                    player_stats['bounces'] = row.find_all('td')[22].text
                    player_stats['goals_against'] = row.find_all('td')[23].text
                    player_stats['percentage_of_game_played'] = row.find_all('td')[24].text            

                except:
                    pass

                stats_data.append(player_stats)
                print("Success Home", end='\t')
        except Exception as e:
            print("Failed Home", end='\t')
            if TESTING:
                print(f"Error: {e} -> url: {url}")

        # extract the away team stats
        try:
            team_name = tables[4].find('th').text.split(' Match')[0]
        except:
            if TESTING:
                print('Error: ', url)
        try:
            for row in tables[4].find('tbody').find_all('tr'):
                player_stats = {}
                try:
                    player_number = row.find_all('td')[0].text.split(' ')[0]
                    player_name = row.find_all('td')[1].text
                    player_stats['player_id'] = generate_entity_id(player_name + team_name + player_number)
                    player_stats['match_id'] = match['match_id']

                    # extract player stats
                    player_stats['kicks'] = row.find_all('td')[2].text
                    player_stats['marks'] = row.find_all('td')[3].text
                    player_stats['handballs'] = row.find_all('td')[4].text
                    player_stats['disposals'] = row.find_all('td')[5].text
                    player_stats['goals'] = row.find_all('td')[6].text
                    player_stats['behinds'] = row.find_all('td')[7].text
                    player_stats['hitouts'] = row.find_all('td')[8].text
                    player_stats['tackles'] = row.find_all('td')[9].text
                    player_stats['rebound_50s'] = row.find_all('td')[10].text
                    player_stats['inside_50s'] = row.find_all('td')[11].text
                    player_stats['clearances'] = row.find_all('td')[12].text
                    player_stats['clangers'] = row.find_all('td')[13].text
                    player_stats['free_kicks_for'] = row.find_all('td')[14].text
                    player_stats['free_kicks_against'] = row.find_all('td')[15].text
                    player_stats['brownlow_votes'] = row.find_all('td')[16].text
                    player_stats['contested_possessions'] = row.find_all('td')[17].text
                    player_stats['uncontested_possessions'] = row.find_all('td')[18].text
                    player_stats['contested_marks'] = row.find_all('td')[19].text
                    player_stats['marks_inside_50'] = row.find_all('td')[20].text
                    player_stats['one_percenters'] = row.find_all('td')[21].text
                    player_stats['bounces'] = row.find_all('td')[22].text
                    player_stats['goals_against'] = row.find_all('td')[23].text
                    player_stats['percentage_of_game_played'] = row.find_all('td')[24].text            

                except:
                    pass

                print("Success Away", end='\t')
                stats_data.append(player_stats)
        except Exception as e:
            print("Failed Away", end='\t')
            if TESTING:
                print(f"Error: {e} -> url: {url}")

    print('\n')

    return stats_data