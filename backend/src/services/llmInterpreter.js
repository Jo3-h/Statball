// services/llmInterpreter.js

const { OpenAI } = require("openai");
const logger = require("../config/logger");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LLM_INSTRUCTION = `
You are an assistant that helps translate AFL stat-related questions into SQL queries.
Use the following schema which outlines the details of each table:

/* table for teams in competition, stats are for totals for entire history */
CREATE TABLE IF NOT EXISTS public.teams(
  team_id serial PRIMARY KEY,
  name character varying,
  games integer,
  wins integer,
  draws integer,
  loses integer,
  points_for integer,
  points_against integer
);

/* table for players in competition, note that team_id denotes the most recent team */
CREATE TABLE IF NOT EXISTS public.players(
  player_id serial PRIMARY KEY,
  team_id integer FOREGIN KEY,
  number integer,
  name character varying, // in the form "{lastname}, {firstname}"
  first_name character varying,
  last_name character varying,
  born date,
  debut date,
  last date,
  height integer,
  weight integer,
  debut_age character varying,
  last_age character varying
);

/* table for matches within the competition, 
CREATE TABLE IF NOT EXISTS public.matches(
  match_id serial PRIMARY KEY,
  round integer,
  year integer,
  home_score integer,
  away_score integer,
  home_score_full character varying,
  away_score_full character varying,
  date date,
  stats_link character varying,
  venue character varying,
  home_win boolean,
  home_team_id integer,
  away_team_id integer
);

/* table for player stats in each match, 
CREATE TABLE IF NOT EXISTS public.match_player_stats(
  stat_id serial PRIMARY KEY,
  player_id integer FOREGIN KEY,
  match_id integer FOREGIN KEY,
  kicks integer,
  marks integer,
  handballs integer,
  disposals integer,
  goals integer,
  behinds integer,
  hitouts integer,
  tackles integer,
  rebound_50s integer,
  inside_50s integer,
  clearances integer,
  clangers integer,
  free_kicks_for integer,
  free_kicks_against integer,
  brownlow_votes integer,
  contested_possessions integer,
  uncontested_possessions integer,
  contested_marks integer,
  marks_inside_50 integer,
  one_percenters integer,
  bounces integer,
  goals_against integer,
  percentage_of_game_played integer
);

Only respond with the SQL query. Don't explain anything. Return only the SQL query without markdown formatting or backticks.

Also, always include the name of the player/team in the query. If the question is about a specific player/team, include their name in the query. If the question is about a specific match, include the home and away team names using 'AS' to alias the team names.
If the question is about a specific round, include the round number in the query. If the question is about a specific year, include the year in the query.

If the question is about a specific stat, include the rest of the stats as well just after the queried stat. i.e. if you have to sum all kicks then return the sum of all other counting stats as well but ensure the queried (kick) sum if the first returned.

If sum or averages are required for a specific stat, make sure the alias of the stat clearly shows what the stat is .

If the question is not related to AFL stats, or you cannot create an informative query, respond with "None".
`;

const generateQuery = async (question) => {
  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    instructions: LLM_INSTRUCTION,
    input: question,
  });
  if (response.output_text === "None") {
    console.error("Error generating query:", response);
    return null;
  }
  logger.info(`LLM response: ${response}`);
  return response.output_text;
};

module.exports = generateQuery;
