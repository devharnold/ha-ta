/**
 * defining our Users data structure model
 * using MySQL as our default database
 * 
 * 
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model{}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        unique: true,
        validate: {
            isPhoneNumber: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
});

model.exports = User;