const { Sequelize } = require("sequelize");

const dbSequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql" }
);

const checkSequelize = async () => {
  try {
    await dbSequelize.authenticate();
  } catch (error) {}
};

module.exports = {
  checkSequelize,
  dbSequelize,
};
