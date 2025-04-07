const SequelizeAuto = require("sequelize-auto");
require("dotenv").config();

// Print out the environment variables
console.log("DB_NAME:", process.env.DEV_DB_NAME);
console.log("DB_USERNAME:", process.env.DEV_DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DEV_DB_PASSWORD);
console.log("DB_HOST:", process.env.DEV_DB_HOST);
console.log("DB_DIALECT:", process.env.DEV_DB_DIALECT);

const auto = new SequelizeAuto(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USERNAME,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

auto.run((err) => {
  if (err) {
    console.error("Error generating models:", err);
  } else {
    console.log("Models generated successfully!");
  }
});
