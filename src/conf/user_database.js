/**
 * sequelizing our project's database
 * working with mysql
 * 
 * @param: host: the localhost, dialect: mysql(default db), logging
 * @param: username: username to be used, password: the password to the db access
 * 
 * 
 */



const { sequelize, Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
})

module.exports = sequelize;