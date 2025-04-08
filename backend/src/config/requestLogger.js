// requestLogger.js

const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info(`Incoming Request - ${req.method} ${
    req.url
  }\nHeaders : ${JSON.stringify(req.headers, null, 2)}\n
    Body : ${req.body ? JSON.stringify(req.body, null, 2) : "no request body"}\n
    `);
  next(); // Pass control to the next middleware
};

module.exports = requestLogger;
