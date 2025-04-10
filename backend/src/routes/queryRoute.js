// queryRoute.js

const express = require("express");
const router = express.Router();
const logger = require("../config/logger");
const { sequelize } = require("../models");
const interpreter = require("../services/llmInterpreter");
const { QueryTypes } = require("sequelize");

router.post("/api/query", async (req, res) => {
  const { question } = req.body;

  // test whether the frontend is correctly passing the query
  logger.info(`Received query: ${question}`);

  // generate a query from the question
  const query = await interpreter(question);

  // if the query is empty, return an error
  if (!query) {
    logger.error(`Failed to generate query from question!`);
    return res.status(400).json({
      message: "Sorry, I couldn't understand your question.",
      error: true,
    });
  }

  // execute the query on the database
  logger.info(`Executing query: ${query}`);
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  logger.info(`Query result: ${JSON.stringify(result)}`);
  res.status(200).json({ result });
});

module.exports = router;
