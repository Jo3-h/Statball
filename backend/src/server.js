// server.js

require("dotenv").config();
const app = require("./app");
const logger = require("./config/logger");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`StatBall API Server is running on port ${PORT}`);
  console.log(`StatBall API Server is running on port ${PORT}`);
});
