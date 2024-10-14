require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "hataData",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "test_database",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "hata_prod_databasecd",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};