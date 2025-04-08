// app.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const requestLogger = require("./config/requestLogger");
const logger = require("./config/logger");

const app = express();

// Define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(requestLogger);
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// Import Routes
const testRoutes = require("./routes/testRoute");
const queryRoutes = require("./routes/queryRoute");

// Use Routes
app.use("/test", testRoutes);
app.use("/", queryRoutes);

// Export the Application
module.exports = app;
