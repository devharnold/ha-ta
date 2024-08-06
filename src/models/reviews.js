/**
 * 
 * 
 * 
 * 
 * 
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reviews extends Model{}
Reviews.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUppercase(value) {
                if (value !== value.toUpperCase()) {
                    throw new Error('Review title must be in uppercase');
                }
            }
        }
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['sent', 'deleted', 'delivered']]
        }
    },
})