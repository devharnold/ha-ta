#!/usr/bin/node

require('dotenv').config();
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const db = require('./src/models');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
}); // test endpoint

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    db.sequelize.sync().then(() => {
        console.log('Database sync');
    }).catch(err => {
        console.error('error syncing', err);
    });
});

var mysql = require('mysql');
var connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(function(err) {
    if(err) {
        console.error('error connecting to mysql server' + err.stack);
        return;
    }
    console.log('Connected to MySQL server as id: ' + connection.threadId);
})