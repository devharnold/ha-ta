'use strict';
import { Model } from 'sequelize';

const Country = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.City, {
        foreignKey: 'countryName',
        as: 'city'
      })
      Country.hasMany(models.User, {
        foreignKey: 'countryName',
        as: 'user',
      })
    }
  }
  Country.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};

export default Country;