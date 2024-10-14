import { sequelize } from "sequelize";
import dotenv from 'dotenv';
import { Sequelize } from "../models";
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('./config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
});

export default sequelize;