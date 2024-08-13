'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate = function(models) {
      // define association here
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'review'
      });
      User.belongsTo(models.Country, {
        foreignKey: 'userID',
        as: 'User'
      });
    };
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};