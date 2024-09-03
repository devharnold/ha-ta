'use strict';

const { User } = require("../models/user"); //importing
// const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.JWT_SECRET;

// handles user display detail
/** exports.user_detial = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: Author detail: ${req.params.id}`);
});

//handles user details update
exports.user_update_detail = asyncHandler(async (req, res, next) => {
    res.send("Not updated: User profile update");
});
*/

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
   
   //async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   //},

  // async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   //}
};

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
module.exports = { hashPassword };

exports.registerUser = async(req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        
        // hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        //newUser and hash the password.
        const newUser = await User.create({ firstName, lastName, email, phoneNumber, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user'})
    }
}

exports.userLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passsword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials'});
        }
        /**const token = jwt.sign({ id: user.id, email: user.email }, 'jwt_token', {
            expiresIn: '2h',
        });
        return res.status(200).json({ token });*/
        const token = generateToken(user); //generates a token upon user login
        res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', error});
    }
}

//function to generate a token
function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.name,
        role: user.user
    };

    return jwt.sign(payload, secretkey, { expiresIn: '2hrs'});
}
