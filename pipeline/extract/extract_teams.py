from bs4 import BeautifulSoup as bs
from config import TEAMS_URL
import requests

def extract_teams():

    print("-----> Extracting teams from AFL TABLES website",end='\n\n')

    # read the html from the url
    response = requests.get(TEAMS_URL)
    html = response.content
    soup = bs(html, 'html.parser')
    table = soup.find('tbody')
    rows = table.find_all('tr')

    teams_data = []
    for row in rows:
        cols = row.find_all('td')
        team_data = {
            'name': cols[0].text.strip(),
            'games': int(cols[1].text.strip()),
            'wins': int(cols[2].text.strip()),
            'draws': int(cols[3].text.strip()),
            'loses': int(cols[4].text.strip()),
            'points_for': int(cols[7].text.strip()),
            'points_against': int(cols[10].text.strip()),
        }
        print(f"\textracted {team_data['name']} team data")
        teams_data.append(team_data)

    print('-----> Finished extracting teams\n')

    return teams_data