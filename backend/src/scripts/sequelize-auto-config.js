const SequelizeAuto = require("sequelize-auto");
require("dotenv").config();

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
