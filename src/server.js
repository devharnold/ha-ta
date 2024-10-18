#!/usr/bin/node

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import { userRoute } from './routes/userRoute.js';
const HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

import db from './models/index.js';
// const db = require('./src/models');

app.use(express.json()); // Parse json arguments

// define routes 
app.use('/api', userRoute)

/**app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
}); (test endpoint)*/ 

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
}).on('error', (err) => {
    if (err.code == 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose another port.`);
        process.exit(1);
    } else {
        console.error('Server error', err)
    }
})

import mysql from 'mysql2/promise';

console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME || 'harnold',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL server as id: ' + connection.threadId);
})