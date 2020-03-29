const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/');
require('custom-env').env('test.key');
require('../../src/models/user');

describe('USER: Authenticate', () => {
    beforeAll(async () => {
        await database.connectionTest();
    });
    afterAll(async () => {
        database.close();
    });
    test("should be able be authentication a user", async () => {
        const response = await request(app)
            .post('/user/authenticate')
            .send({
                user:  "marcon",
                pass: "12345"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email');
        expect(response.body.user).toHaveProperty('user');
    });
    test("should be able be don't find a user (user not exist)", async () => {
        const response = await request(app)
            .post('/user/authenticate')
            .send({
                user: "marconnot",
                pass: "12345"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('user not found');
    });
    test("should be able to return error when passing wrong password", async () => {
        const response = await request(app)
            .post('/user/authenticate')
            .send({
                user: "marcon",
                pass: "12345a"
            });

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('access denied');
    });
    test("should be able to return error because don't send a user of body", async () => {
        const response = await request(app)
            .post('/user/authenticate')
            .send({
                pass: "12345"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"user\" is required');
    });
    test("should be able to return error because don't send a pass of body", async () => {
        const response = await request(app)
            .post('/user/authenticate')
            .send({
                user: "marcon"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"pass\" is required');
    });
});

describe('USER: Create User', () => {
    beforeAll(async () => {
        await database.connectionTest();
    });
    afterAll(async () => {
        
        await database.mongoose.model('Users').deleteOne({user: "testuser"});
        database.close();
    });
    test('should be able be create a user', async () => {
        const response = await request(app)
            .post('/user/resgister')
            .send({
                name: "Test Azul",
                email: "testuser@mh4sh.dev",
                user: "testuser",
                pass: "12345"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('user');
    });
    test("should be able be return a error becalse this email or user really exist", async () => {
        const response = await request(app)
        .post('/user/resgister')
        .send({
            name: "Test Azul",
            email: "testuser@mh4sh.dev",
            user: "testuser",
            pass: "12345"
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Bad Request');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"user\" or \"email\" already in use');

    });
    test("should be able be return a error becalse you don't send a a name", async () => {
        const response = await request(app)
        .post('/user/resgister')
        .send({
            email: "testuser@mh4sh.dev",
            user: "testuser",
            pass: "12345"
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Bad Request');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"name\" is required');

    });
    test("should be able be return a error becalse you don't send a a email", async () => {
        const response = await request(app)
        .post('/user/resgister')
        .send({
            name: "Test Azul",
            user: "testuser",
            pass: "12345"
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Bad Request');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"email\" is required');

    });
    test("should be able be return a error becalse you don't send a a user", async () => {
        const response = await request(app)
        .post('/user/resgister')
        .send({
            name: "Test Azul",
            email: "testuser@mh4sh.dev",
            pass: "12345"
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Bad Request');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"user\" is required');

    });
    test("should be able be return a error becalse you don't send a a pass", async () => {
        const response = await request(app)
        .post('/user/resgister')
        .send({
            name: "Test Azul",
            email: "testuser@mh4sh.dev",
            user: "testuser"
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Bad Request');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('\"pass\" is required');

    });
})