// app.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/logger");

const app = express();

// Define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// Import Routes
const testRoutes = require("./routes/test");

// Use Routes

// Export the Application
module.exports = app;
