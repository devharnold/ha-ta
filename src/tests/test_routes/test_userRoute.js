#!/usr/bin/env node
import request from 'supertest';
import express from 'express';
import { userRoute } from '../../routes/userRoute.js'
import User from '../../models/user.js';
import { expect } from 'chai';
import { authenticateUser } from '../../middlewares/authmiddleware.js'

const app = express();
app.use(express.json());

app.use('/user', userRoute);
app.post('/put', authenticateUser);

/**app.post('/get', user);
app.post('/post', user/id);
app.post('/delete', user/id);
*/

describe('User route tests', () => {
    describe('GET /user/:id', () => {
        it('should fetch a user by the userId', async() => {
            const response = await request(app)
                .get('/user/:id')
                .set('Accept', 'application/json')
            expect(response.status).to.equal(200)
            expect(response.headers['Content-Type']).to.match(/json/)
            expect(response.body).to.have.property('userId', '340')
        });
    });
    describe('GET /user', () => {
        it('should return a user', async() => {
            const response = await request(app)
                .get('/user')
                .send({
                    firstName: 'Arnold',
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(200);
            expect(response.headers['Content-Type']).to.match(/json/);
            expect(response.body).to.have.property('firstName', 'Arnold');
        });
        
        it('should get user by name', async() => {
            const response = await request(app)
                .get('/user/user/:name')
                .send({
                    lastName: 'Henry'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal();
            expect(response.headers['Content-Type']).to.match(/json/);
            expect(response.body).to.have.property('lastName', 'Henry')
        })
    });

    describe('POST /user', () => {
        it('should create a new user', async() => {
            const response = await request(app)
                .post('/user')
                .send({
                    fistName: 'henry',
                    lastName: 'arnold',
                    phoneNumber: '143444945',
                    email: 'testarn@email.com',
                    password: 'testpassword',
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal();
            expect(response.headers['Content-Type']).to.match(/json/);
            expect(response.body).to.have.property('email', 'testarn@example');
        });
        
        it('should post a user with case-sensitive match', async() => {
            const response = await request(app)
                .post('/user')
                .send({
                    firstName: 'elle'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(200);
            expect(response.headers['Content-Type', 'application/json']);
            expect(response.body).to.have.property('firstName', 'elle');
        });
    });

    describe('PUT /user/:id', () => {
        it('should authenticate a user first before updating', async() => {
            const response = await request(app)
                .get('/user/:id')
                .auth('email', 'password')
                .send({
                    email: 'testarn@email.com',
                    password: 'testpassword'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(200);
            expect(response.headers['Content-Type']).to.match(/json/);
        });

        it('should deny access after wrong credentials', async() => {
            const response = await request(app)
                .get('/user/:id')
                .auth('email', 'password')
                .send({
                    email: 'testarn@email.com',
                    password: 'wrongpassword'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(401);
            expect(response.headers['Content-Type']).to.match(/json/);
        });
    });

    describe('DELETE /user/:id', () => {
        it('should delete a user only after validated', async() => {
            const response = await request(app)
                .get('/user/:id')
                .auth('email', 'password')
                .send({
                    email: 'testuser@email.com',
                    password: 'testpassword'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(204); // No content after deleting a user
            expect(response.headers['Content-Type']).to.match(/json/);
        });
        it('should deny user the permission due to invalid credentials', async() => {
            const response = await request(app)
                .get('/user/:id')
                .auth('email', 'password')
                .send({
                    email: 'testmail@email.com',
                    password: 'wrongpassword'
                })
                .set('Accept', 'application/json')
            expect(response.status).to.equal(401);
            expect(response.headers['Content-Type']).to.match(/json/);
        });
    });
});