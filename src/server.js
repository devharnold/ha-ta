#!/usr/bin/env node

/**
 * starting up our server on this node.js project
 * 
 * @returns: 'Hello world!' with httpStatus '200'
 */

const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createSerer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello, world!')
});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});

/**
 * var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'harnold',
    user: 'harnold',
    password: 'secretpass',
});
connection.connect(function(err) {
    if (err) {
        console.error('error conneting: ' + err.stack);
        return;
    }

    console.log('connected as id: ' + connection.threadId);
});
 */