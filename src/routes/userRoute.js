"use strict";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const router = express.Router();
// import { User } from '../models/user';
import { registerUser, userLogin, deleteUser } from '../controllers/userController.js';
// import { authenticateUser } from '../middlewares/authMiddleware';

app.use(express.json());
app.use(registerUser);
app.use(userLogin);
app.use(deleteUser);

// get user according to the user id
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

// get user by the name
router.get('/user', async(req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne(user.name);

        if(user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'OOPS!: User not found' });
        }
    } catch (error) {
        console.error('Error fetching your request', error);
        res.status(500).send({ message: 'Server error' })
    }
})

router.get('/user/name/:name', async(req, res) => {
    try {
        const username = req.params.name;
        const user = await User.findOne({ where: { name: username } });

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
        // const newUser = req.body;
        // const createdUser = await User.create(newUser);
        const { firstName, lastName, email, phoneNumber, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.registerUser({ firstName, lastName, email, phoneNumber, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating a new user!', error);
        res.status(500).send({ message: 'Server error!' });
    }
});

router.put('/user/:userId', authenticateUser, async(req, res) => {
    const { userId } = req.params;
    // fields to be updated
    const { firstName, lastName, phoneNumber, password } = req.body;
    
    try {
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        const validatePassword = (password) => {
            const isValidLength = password.length >= 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);

            return isValidLength && hasUpperCase && hasLowerCase && hasNumber;
        }

        if (password) {
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Make sure password meets requirements' })
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword;          
        }

        await user.save();

        res.json({ message: 'User updated profile', user });
    } catch(error) {
        res.status(500).json({ message: 'Error', error });
    }
});

router.delete('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(user) {
            // await user.destroy();
            const user = await User.deleteUser(); 
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

export const userRoute = router;
