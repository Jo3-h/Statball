from datetime import datetime
from bs4 import BeautifulSoup as bs
import requests

def extract_matches():

    print('-----> Extracting match data from AFL TABLES website', end='\n\n')

    match_data = []
    current_year = datetime.now().year

    for year in range(2010, current_year):

        url = f"https://afltables.com/afl/seas/{year}.html"
        response = requests.get(url)
        print(f"\tExtracting matches for {year} from {url}")
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            continue
        soup = bs(response.text, 'html.parser')
        tables = soup.find_all('table')

        # every two tables is an instance of a round of matches
        for i in range(0, len(tables), 2):
            try:
                round_matches = []
                round  = tables[i].find('b').text
                data = tables[i+1]
                games = data.find_all('table')
                for game in games:
                    if game.find('td').text == 'Bye':
                        continue
                    match = {}
                    match['round'] = round
                    match['year'] = year
                    match['home_team'] = game.find('td').text
                    match['away_team'] = game.find_all('tr')[1].find('td').text
                    match['home_score'] = game.find_all('tr')[0].find_all('td')[2].text
                    match['away_score'] = game.find_all('tr')[1].find_all('td')[2].text
                    match['home_score_full'] = game.find_all('tr')[0].find_all('td')[1].text
                    match['away_score_full'] = game.find_all('tr')[1].find_all('td')[1].text
                    match['date'] = game.find('tr').find_all('td')[3].text
                    match['stats_link'] = game.find_all('tr')[1].find_all('td')[3].find('a')['href']
                    match['venue'] = game.find_all('tr')[0].find_all('td')[3].find('a').text
                    round_matches.append(match)
                    print(f"\t\tExtracted data for round {match['round']} - {match['home_team']} v {match['away_team']}")

            except:
                pass

            match_data.extend(round_matches)
            
    print('-----> Finished extracting march data\n')

    return match_data