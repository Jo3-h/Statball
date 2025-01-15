from config import LOG_FILE
import os       
from datetime import datetime
import getpass

def logger(message: str, level: str):

    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, "w") as file:
            file.write("")

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        username = getpass.getuser()
    except:
        username = "Unknown username"

    with open(LOG_FILE, "a") as file:
        file.write(f'[{level.upper()}] [{current_time}] [{username}] -> {message}\n')

    return