const request = require('supertest');
const express = require('express');
const { expect } = require('chai');
const app = express();

describe('GET /search-flights', function() {
    it('should respond with JSON', async function() {
        const response = await request(app)
            .get('/search-flights')
            .set('Accept', 'application/json');
        expect(response.headers['Content-Type']).to.match(/json/);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('flights');
    });
});

describe('GET /amadeusToken', function() {
    it('should respond with JSON', async function() {
        const response = await request(app)
            .get('/amadeusToken')
            .set('Accept', 'application/json');
        expect(response.headers['Content-Type']).to.match(/json/);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('amadeus token')
    })
})


