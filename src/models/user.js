'use strict';
// import { userRoute } from '../routes/userRoute';
import bcrypt from 'bcryptjs';

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
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: [8, 16] // sets a minimum of 8 and a maximum of 16 characters within the string.
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User',

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  return User;
};

// export User as a named export.
export { User };