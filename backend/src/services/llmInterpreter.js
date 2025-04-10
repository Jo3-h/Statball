// services/llmInterpreter.js

const { OpenAI } = require("openai");
const logger = require("../config/logger");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LLM_INSTRUCTION = `
You are an assistant that helps translate AFL stat-related questions into SQL queries.
Use the schema:
"table_schema"	"table_name"	"column_name"	"data_type"
"public"	"match_player_stats"	"stat_id"	"integer"
"public"	"match_player_stats"	"player_id"	"integer"
"public"	"match_player_stats"	"match_id"	"integer"
"public"	"match_player_stats"	"kicks"	"integer"
"public"	"match_player_stats"	"marks"	"integer"
"public"	"match_player_stats"	"handballs"	"integer"
"public"	"match_player_stats"	"disposals"	"integer"
"public"	"match_player_stats"	"goals"	"integer"
"public"	"match_player_stats"	"behinds"	"integer"
"public"	"match_player_stats"	"hitouts"	"integer"
"public"	"match_player_stats"	"tackles"	"integer"
"public"	"match_player_stats"	"rebound_50s"	"integer"
"public"	"match_player_stats"	"inside_50s"	"integer"
"public"	"match_player_stats"	"clearances"	"integer"
"public"	"match_player_stats"	"clangers"	"integer"
"public"	"match_player_stats"	"free_kicks_for"	"integer"
"public"	"match_player_stats"	"free_kicks_against"	"integer"
"public"	"match_player_stats"	"brownlow_votes"	"integer"
"public"	"match_player_stats"	"contested_possessions"	"integer"
"public"	"match_player_stats"	"uncontested_possessions"	"integer"
"public"	"match_player_stats"	"contested_marks"	"integer"
"public"	"match_player_stats"	"marks_inside_50"	"integer"
"public"	"match_player_stats"	"one_percenters"	"integer"
"public"	"match_player_stats"	"bounces"	"integer"
"public"	"match_player_stats"	"goals_against"	"integer"
"public"	"match_player_stats"	"percentage_of_game_played"	"integer"
"public"	"matches"	"match_id"	"integer"
"public"	"matches"	"round"	"integer"
"public"	"matches"	"year"	"integer"
"public"	"matches"	"home_score"	"integer"
"public"	"matches"	"away_score"	"integer"
"public"	"matches"	"home_score_full"	"character varying"
"public"	"matches"	"away_score_full"	"character varying"
"public"	"matches"	"date"	"date"
"public"	"matches"	"stats_link"	"character varying"
"public"	"matches"	"venue"	"character varying"
"public"	"matches"	"home_win"	"boolean"
"public"	"matches"	"home_team_id"	"integer"
"public"	"matches"	"away_team_id"	"integer"
"public"	"players"	"team_id"	"integer"
"public"	"players"	"number"	"integer"
"public"	"players"	"name"	"character varying"
"public"	"players"	"first_name"	"character varying"
"public"	"players"	"last_name"	"character varying"
"public"	"players"	"born"	"date"
"public"	"players"	"debut"	"date"
"public"	"players"	"last"	"date"
"public"	"players"	"height"	"integer"
"public"	"players"	"weight"	"integer"
"public"	"players"	"debut_age"	"character varying"
"public"	"players"	"last_age"	"character varying"
"public"	"players"	"player_id"	"integer"
"public"	"teams"	"team_id"	"integer"
"public"	"teams"	"name"	"text"
"public"	"teams"	"games"	"integer"
"public"	"teams"	"wins"	"integer"
"public"	"teams"	"draws"	"integer"
"public"	"teams"	"loses"	"integer"
"public"	"teams"	"points_for"	"integer"
"public"	"teams"	"points_against"	"integer"

Only respond with the SQL query. Don't explain anything. Return only the SQL query without markdown formatting or backticks.

If the question is not related to AFL stats, respond with "None".
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
