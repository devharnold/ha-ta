#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import getAmadeusToken from '../../routes/flightRoute';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET

const app = express();
app.use(express.json());

app.post('/GET AmadeusToken', getAmadeusToken);
app.post('/GET search-flights', search-flights);

describe('flight route tests', () => {
    describe('GET /amadeusToken', () => {
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

    describe('GET /search-flights', () => {
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