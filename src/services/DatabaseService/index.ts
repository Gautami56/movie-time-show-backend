const { Sequelize } = require("sequelize");

const dbSequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "gautami",
  password: "Layer7@43",
  database: "movies",
});

module.exports = {
  dbSequelize,
};
