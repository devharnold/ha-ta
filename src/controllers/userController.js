'use strict';

import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretkey = process.env.JWT_SECRET;

// hash Passwords
/**export function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
module.exports = { hashPassword };*/

// register a User
export async function registerUser (req, res) {
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

// User login
export async function userLogin (req, res) {
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

// delete a User
export async function deleteUser (req, res) {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).json({ error: 'User not found!'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ error: 'Invalid creditials' })
        }

        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully '})
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Error occured while deleting user. PLease try again later'})
    }
}

// generate a token
export function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.name,
        role: user.user
    };

    return jwt.sign(payload, secretkey, { expiresIn: '2hrs'});
}