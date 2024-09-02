#!/usr/bin/env node
'use strict';
require('dotenv').config();

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

exports.requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

exports.validateEnv = (req, res, next) => {
    if (!AMADEUS_API_KEY || AMADEUS_API_SECRET) {
        console.error('Amadeus API credentials are missing');
        return res.status(500).send('Server Error');
    }
    next();
};

exports.errorHandler = (req, res, next) => {
    console.error('An error occured:', error.message);
    res.status(500).send('Server Error');
};
