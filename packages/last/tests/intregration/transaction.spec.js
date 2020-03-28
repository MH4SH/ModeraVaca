const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/');
require('custom-env').env('test.key');

describe('ROUTE: Transactions', () => {
    beforeEach(async () => {
        await database.connectionTest();
    });

    afterAll(async () => {
        await database.close();
    })
    it('should be able to list yours transactions', async () => {
        const response = await request(app)
            .get('/transaction');

        expect(response.body[0]).toHaveProperty('_aid');
    })
})