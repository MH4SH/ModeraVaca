const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/');
require('custom-env').env('test.key');

describe('ROUTE: Sale', () => {
    beforeAll(async () => {
        await database.connectionTest();
    });
    afterAll(async () => {
        database.close();
    });
    it('should be able all itens with with a item of type buyer', async () => {
        const response = await request(app)
            .get('/sale');
        
        response.body.map(item => expect(item).toHaveProperty('buyer'));
        
    });
});