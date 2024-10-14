#!/usr/bin/env node

// import User from '../../models/user';
import { expect } from 'chai';
import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

class User extends Model {}

//new Sequelize model
const sequelize = new Sequelize('hataData', 'root', process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
});

// Initialize User model only if it is not already imported or declared
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
})

describe('MySQL Connection', function () {
    // create a connection before any function is executed.
    before(async function() {
        try {
            await sequelize.authenticate();
            console.log('Connected');
            await sequelize.sync({ force: true });
        } catch(error) {
            console.error('Unable to connect', error);
        }
    });
    beforeEach(async function() {
        // clear table before each test
        await User.destroy({ where: {} })
    });

    it('should save user to the database', async function () {
        // async function save a user to the db
        const createNewUser = await User.create({ username: 'Bonareri' });

        const foundUser = await User.findOne({ where: { username: 'Bonareri' } });

        expect(foundUser).to.exist;
        expect(foundUser.username).to.equal('Bonareri');
    });
    after(function (done) {
        done();
    });
});