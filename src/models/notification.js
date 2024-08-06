/**
 * Notification class model
 * Sends a user notification via the dashboard or even emails(important ones)
 * 
 * @param: 
 * @returns: 
 * 
 */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class Notification extends Model{}
Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUpperCase(value) {
                if (value !== value.toUpperCase()) {
                    throw new Error('Notification Title must be in uppercase')
                }
            }
        }
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['unread', 'read', 'delivered']]
        }
    },
})