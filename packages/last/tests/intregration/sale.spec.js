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
    it('POST:: should be able create a new sale', async () => {
        const response = await request(app)
            .post('/sale')
            .send({
                "buyer":  "5e6beb7dba56ab37d900ff6c",
                "purchase": "5e6bdcf013e34f37d9d68c85",
                "date": "2020-02-09T02:00:00.000+00:00",
                "amount": 141,
                "cattle": [
                        1900,
                        1900,
                        1900,
                        1900,
                        1900,
                        1900,
                        1900,
                        1900,
                        1900,
                        1900
                    ]
            });

            expect(response.body).toHaveProperty('_id');
    });
    it('POST:: should be able don`t create a new sale because don`t have params required', async () => {
        const response = await request(app)
            .post('/sale')
            .send({"buyer":  "5e6beb7dba56ab37d900ff6c"});

            expect(response.body).toHaveProperty('error');
    });
    it('GET:: should be able all itens with with a item of type buyer', async () => {
        const response = await request(app)
            .get('/sale');
        
        expect(response.body.length).not.toBe(0);
        response.body.map(item => expect(item).toHaveProperty('buyer'));
    });
    it('DELETE:: should be able delete a buyer after get your ID.', async () => {
        const res = await request(app)
            .get('/sale');

        const _id = res.body[1]._id;
        
        const response = await request(app)
            .delete(`/sale/${_id}/`);

            expect(response.status).toBe(204);
    });
});