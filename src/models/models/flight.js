'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.hasMany(models.City, {
        foreignKey: 'flightNumber',
        as: 'city'
      })
    }
  }
  Flight.init({
    flightNumber: DataTypes.INTEGER,
    departureCityId: DataTypes.INTEGER,
    arrivalCityId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};