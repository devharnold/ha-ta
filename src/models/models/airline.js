'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airline.hasMany(models.Flight, {
        foreignKey: 'airlineId',
        as: 'flights'
      });
    }
  }
  Airline.init({
    airlineName: DataTypes.STRING,
    airlineIATACode: DataTypes.INTEGER,
    airlineCountry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airline',
  });
  return Airline;
};