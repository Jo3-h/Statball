// config/logger.js

const winston = require("winston");

// Create a custom error logging format
const errorFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    if (message instanceof Error) {
      // If the message is an error, extract and clean up the details
      return `${timestamp} [${level}] ${message.name}: ${
        message.message
      }\nStack: ${stack || "No stack trace"}`;
    } else {
      return `${timestamp} [${level}] ${message}`;
    }
  }
);

// Create logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    errorFormat // Apply custom format for error messages
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        errorFormat // Use the custom error format here as well
      ),
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      format: errorFormat, // Apply the same format for file logs
    }),
  ],
});

module.exports = logger;
