#!/usr/bin/node

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { userRoute } from './routes/userRoute.js';
import mysql from 'mysql2';

const app = express();
const hostname = process.env.DB_HOST;
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', userRoute);

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
}); // test endpoint

app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
}).on('error', (err) => {
    if (err.code == 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose another port.`);
        process.exit(1);
    } else {
        console.error('Server error', err);
    }
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting to mysql server' + err.stack);
        return;
    }
    console.log('Connected to MySQL server as id: ' + connection.threadId);
});