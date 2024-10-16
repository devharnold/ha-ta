#!/usr/bin/node

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import { userRoute } from './routes/userRoute.js';
const hostname = process.env.DB_HOST;
const port = process.env.PORT;
import mysql from 'mysql2';

import db from './models/index.js';
// const db = require('./src/models');

app.use(express.json());
app.use('/api', userRoute)

/**app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
}); (test endpoint)*/ 

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}).on('error', (err) => {
    if (err.code == 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please choose another port.`);
        process.exit(1);
    } else {
        console.error('Server error', err)
    }
})

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL server as id: ' + connection.threadId);
})