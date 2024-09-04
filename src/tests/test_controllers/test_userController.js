import { registerUser, userLogin } from "../../controllers/userController.js";
import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import express from 'express';

const { request } = supertest;

const app = express();
app.use(express.json());

app.post('/register', registerUser);
app.post('/login', userLogin);

describe('User controller tests', () => {
    describe('POST /register', () => {
        it('should register a new user successfully', async() => {
            const response = await request(app)
                .post('/register')
                .send({
                    firstName: 'Bona',
                    secondName: 'Reri',
                    email: 'test@example.com',
                    phoneNumber: '12345567',
                    password: 'testpassword',
                });
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('email', 'test@example.com')
        });
    });

    describe('POST /login', () => {
        it('should login a user successfully', async() => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'test@example.com',
                    password: 'testpassword',
                });
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('firstName', 'Bona')
        });
    });

    describe('POST /login', () => {
        it('should check for valid credentials', async() => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'test@example.com',
                    password: 'testpasss',
                });
            expect(response.status).to.equal(401);
        });
    });
});