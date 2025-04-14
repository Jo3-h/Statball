from config import PLAYERS_URL, TESTING
import requests
from bs4 import BeautifulSoup as bs

def extract_players():

    print('-----> Extracting players from AFL TABLES website', end='\n\n')

    players_data = []

    # read the html from the url
    for year in range(2010, 2026):
        print(f"\tExtracting players for {year} from {PLAYERS_URL}/{year}.html")
        response = requests.get(f"{PLAYERS_URL}/{year}.html")
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            continue
        soup = bs(response.text, 'html.parser')
        tables = soup.find_all('table')
        for table in tables[1:]:
            
            team = table.find('a').text
            rows = table.find_all('tbody')[0].find_all('tr')
            for row in rows:
                player = {}
                player['team'] = team
                player['number'] = row.find_all('td')[0].text
                player['name'] = row.find_all('td')[1].text
                name = player['name'].split(', ')
                player['first_name'] = name[1]
                player['last_name'] = name[0]
                # if player is already in the players_data list then continue past
                if players_data.count(player) > 0:
                    continue

                response = requests.get(f'https://afltables.com/afl/stats/players/{name[1][0]}/{name[1]}_{name[0]}.html')
                if response.status_code != 200:
                    continue
                print(f"\t\tExtracting data for {player['name']} from {[player['team']]}")
                soup = bs(response.text, 'html.parser')

                            # Extract data following specific <b> elements
                born_element = soup.find('b', text='Born:')
                if born_element:
                    player['born'] = born_element.next_sibling.strip()

                debut_element = soup.find('b', text='Debut:')
                if debut_element:
                    player['debut'] = debut_element.next_sibling.strip()

                last_element = soup.find('b', text='Last:')
                if last_element:
                    player['last'] = last_element.next_sibling.strip()

                height_element = soup.find('b', text='Height:')
                if height_element:
                    player['height'] = height_element.next_sibling.strip()

                weight_element = soup.find('b', text='Weight:')
                if weight_element:
                    player['weight'] = weight_element.next_sibling.strip()

                players_data.append(player)

    print('-----> Finished extracting players\n')

    return players_data