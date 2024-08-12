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
      Flight.belongsTo(models.City, {
        foreignKey: 'depatureCityId',
        as: 'depatureCity',
      });

      Flight.hasMany(models.City, {
        foreignKey: 'flightNumber',
        as: 'city'
      });

      Flight.belongsTo(models.Airline, {
        foreignKey: 'airlineId',
        as: 'airline'
      });

    }
  }
  Flight.init({
    airlineName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depatureCityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    depatureID: {
      type: DataTypes.STRING,
      allowNull: true,
    }, // airport abbreviation -eg JKIA
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalCityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalId: {
      type: DataTypes.STRING,
      allowNull: true
    }, // airport abreviation - eg CDG
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};