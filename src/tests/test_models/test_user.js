#!/usr/bin/env node

import User from '../../models/user';
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

describe('MySQL Connection', function () {
    // create a connection before any function is executed.
    before(async function() {
        try {
            await sequelize.authenticate();
            console.log('Connected');

            User.init({
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            }, {
                sequelize,
                modelName: 'User',
                tablename: 'users',
                timestamps: false,
            });
            await sequelize.sync({ force: true });
        } catch(err) {
            console.err('Unable to connect', err);
        }
    });
    beforeEach(async function() {
        // clear table before each test
        await User.destroy({ where: {} })
    });

    it('should save user to the database', async function () {
        // async function save a user to the db
        const Bonareri = await User.create({ username: 'Bonareri' });

        const foundUser = await User.findOne({ where: { username: 'Bonareri' } });

        expect(foundUser).to.exist;
        expect(foundUser.username).to.equal('Bonareri');
    });
    afterAll(function (done) {
        done();
    });
});