const request = require('supertest');
const express = require('express');
const app = express();

// test for get user by userId
describe('GET /user/:id', function() {
    it('responds with json', async function() {
        const response = await request(app)
            .get('/user/:id')
            .auth('username', 'password')
            .set('Accept', 'application/json')
        expect(response.headers['Content-Type']).to.match(/json/);
        expect(response.status).to.equal(200);
        expect(response.body.userId).to.equal('testid')
    });
});

// test for get user by name
describe('GET /user/name/:name', function() {
    it('responds with json', async function() {
        const response = await request(app)
            .get('user/name/:name')
            .auth('username', 'password')
            .set('Accept', 'application/json')
        expect(response.headers['Content-Type']).to.match(/json/);
        expect(response.status).to.equal(200);
        expect(response.body.username).to.equal('testuser');
    })
})

//post a user
describe('POST /user', function() {
    it('responds with json', function(done) {
        request(app)
            .post('/user')
            .send({ name: 'john' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                return done();
            });
    });
});

// post a user with a case-insensitive match
describe('POST /users', function() {
    it('user.name should be a case-insensitive match for john', async function() {
        const response = await request(app)
            .post('/user')
            .send('name=elle')
            .set('Accept', 'application/json')
            .expect(function(res) {
                res.body.id = 'some id';
                res.body.name = res.body.toLowerCase();
            })
            .expect(response.headers['Content-Type']).to.match(/json/)
            .expect(200, {
                id: 'some id',
                name: 'elle'
            }, done);
    });
});