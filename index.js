#!/usr/bin/node

require('dotenv').config();
const express = require('express');
const userRoute = require('../ha-ta/src/routes/userRoute');
const app = express();
const hostname = '127.0.0.1';
const port = '3001';

const db = require('./src/models');

app.use(express.json());
app.use('/api', userRoute)

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
}); // test endpoint

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

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
connection.connect(function(err) {
    if(err) {
        console.error('error connecting to mysql server' + err.stack);
        return;
    }
    console.log('Connected to MySQL server as id: ' + connection.threadId);
});