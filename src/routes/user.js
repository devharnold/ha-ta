"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const { User } = require('../models/models/user');

app.use(express.json());

router.get('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'OOPS!: User not found' });
        }
    } catch (error) {
        console.error('Error fetching your request!', error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/user/name/:name', async(req, res) => {
    try {
        const username = req.params.name;
        const user = await User.findOne({ where: { firstName: username } });

        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching your request', error);
        res.status(500).send({ message: 'Server error' });
    }
});

router.post('/user', async(req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await User.create(newUser);

        res.status(201).send({ message: 'New user creeated!' });
    } catch (error) {
        console.error('Error creating a new user!');
        res.status(500).send({ message: 'Server error!' });
    }
});

router.put('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;

        const user = await User.findByPk(userId);

        if(user) {
            await user.update(updatedUser);
            res.json({ message: 'User updated their profile!', user });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch(error) {
        console.error('Error updating user by id', error);
        res.status(500).send({ message: 'Server error' })
    }
});

router.delete('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(user) {
            await user.destroy();
            res.json({ message: 'User deleted profile', user });
        } else {
            res.status(404).send({ meSsage: 'User not found' });
        }
    } catch(error) {
        console.error('Error deleting the user', error);
        res.status(500).send({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.use('/api', router);

app.listen(PORT, error => {
    if(error) {
        return console.error("Error!", error);
    }
    console.log(`Listening on port: ${PORT}`);
});

module.exports = router;