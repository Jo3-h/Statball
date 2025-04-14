# Statball: AFL Statistics Querying harnessing NLP

Statball is a full-stack web application that utilised chatGPT API to transform natural language queries into SQL query statements and requesting data from backend systems. Utilising AWS hosted PostgreSQL database, Express.js backend, and React.js frontend, this application can assist in finding fast answers to your AFL related questions!

### Features
- AI-Powered NLP: Converts user questions into SQL queries harnessing GPT
- Python Data Pipeline: Retrieves latest statistics and information through web-scraping afltables.com
- PostgreSQL Database: Stores detailed match and player statistics
- Express.js Backend API: Receives queries and communicates with external services and databases
- React.js Frontend: Serves as GUI for user input and displays results from backend
- Tailwind Styling: Styling framework utilised for creating a responsive GUI

### Challenges & Limitations
- Availability of data, webscraping inefficient method and prone to errors
- Configuring LLM prompt to correctly interpret the question and generating an effective database query against the existing schema
- Webscraping requiring large number of requests to afltables.com which risks hitting rate limits and causing unnecassary traffic at afltables.com servers
- Reliability of entity_id generation in data pipeline
- Inefficient database schema design due to data extraction limitations leading to a requirement for more complex SQL queries. LLM struggles with increased complexity to maintain coherent and suitable insights

### Frontend GUI
![image](https://github.com/user-attachments/assets/8a33a0b0-2360-461e-bb6c-8c8aef2e2871)
