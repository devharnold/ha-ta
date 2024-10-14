#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import { getAmadeusToken, searchFlights } from '../../routes/flightRoute.js';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET

const app = express();
app.use(express.json());

app.post('/AmadeusToken', getAmadeusToken);
app.post('/search-flights', searchFlights);

/**
 * Flight route tests
 * 1. Get amadeus token
 * 2. Search flights
 * Tests if it fetches the amadeus token,
 *  @returns: Success if connected with amadeus token
 * Tests for search-flights function
 *  @returns: Possible flights according to the query params
 * 
 */
describe('flight route tests', () => {
    describe('POST /amadeusToken', () => {
        it('should get the amadeus api token key', async() => {
            const response = await request(app)
                .get('/amadeusToken')
                .auth(AMADEUS_API_KEY, AMADEUS_API_SECRET)
                .set('Accept', 'application/json')
            expect(response.status).to.equal(201);
            expect(response.headers['Content-Type']).to.match(/json/)
            expect(response.body).to.have.property(AMADEUS_API_KEY, AMADEUS_API_SECRET)
        });
    });

    describe('POST /search-flights', () => {
        it('should return list of found flights', async() => {
            const response = await request(app)
                .get('/amadeusToken')
                .auth(AMADEUS_API_KEY, AMADEUS_API_SECRET)
                .set('Accept', 'application/json')
            expect(response.status).to.equal(200)
            expect(response.headers['Content-Type']).to.match(/json/)
            expect(response.body).to.have.property('flights')
        });
    });
})