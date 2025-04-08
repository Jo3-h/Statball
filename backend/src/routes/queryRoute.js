// queryRoute.js

const express = require("express");
const router = express.Router();
const logger = require("../config/logger");
const interpreter = require("../services/llmInterpreter");

router.post("/api/query", async (req, res) => {
  const { question } = req.body;

  // test whether the frontend is correctly passing the query
  logger.info(`Received query: ${question}`);

  res.status(200).json({ message: "Query received", question });
});

module.exports = router;
