'use strict';
import fs from 'fs';
import Sequelize from 'sequelize';
import process from 'process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get basename of the file and set the environment
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db = {};

let sequelize;

// Dynamically import the config file using import()
const loadConfig = async () => {
  try {
    // Import the config module dynamically
    const configModule = await import(path.join(__dirname, '/../config/config.js'));
    const config = configModule.default[env];

    // Check if config is defined for the current environment
    if (!config) {
      throw new Error(`Configuration for environment "${env}" not found`);
    }

    // Initialize Sequelize with the config details
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    // Load models from the current directory
    const modelFiles = fs
      .readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
        );
      });

    // Dynamically import each model and initialize it with Sequelize
    for (const file of modelFiles) {
      const modelModule = await import(path.join(__dirname, file));
      const model = modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }

    // Set up model associations if they exist
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    // Assign Sequelize and sequelize to the db object
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

  } catch (error) {
    console.error('Error loading configuration:', error.message);
    process.exit(1); // Exit the process if there's an error
  }
};

// Call the function to load config and set up Sequelize
await loadConfig();

export default db;