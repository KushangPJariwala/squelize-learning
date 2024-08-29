const { Sequelize, Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("sequelizePractice", "root", "Kush@ng3092", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require("./contact")(sequelize, DataTypes, Model);
db.user = require("./user")(sequelize, DataTypes);

db.sequelize.sync();
module.exports = db;
