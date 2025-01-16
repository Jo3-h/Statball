from config import PLAYERS_URL, TESTING
import requests
from bs4 import BeautifulSoup as bs

def extract_players():

    players_data = []

    # read the html from the url
    response = requests.get(PLAYERS_URL)
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


            response = requests.get(f'https://afltables.com/afl/stats/players/{name[1][0]}/{name[1]}_{name[0]}.html')
            if response.status_code != 200:
                continue
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

    return players_data