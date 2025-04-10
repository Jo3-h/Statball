// models/index.js

const sequelize = require("../config/config");
const initModels = require("./init-models");

const models = initModels(sequelize);

module.exports = { sequelize, ...models };
