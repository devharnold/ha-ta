/**
 * controllers to the { user } model
 * like, get, create, delete
 * 
 * @return: 
 */


const user = require('../models/user');

const createUser = async (req, res) => {
    try {
        const user = await user.create({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getUser = async (req, res) => {
    try {
        const user = await user.getUser({
            username: req.body.username,
            email: req.body.email,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await user.deleteUser({
            username: req.body.username,
            email: req.body.email,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createUser }, { getUser}, { deleteUser }