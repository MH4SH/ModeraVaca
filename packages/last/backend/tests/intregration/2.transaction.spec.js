const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database');
require('custom-env').env('test.key');

describe('TRANSACTION: List', () => {
    beforeAll(async () => {
        await database.connectionTest();
    });
    afterAll(async () => {
        database.close();
    });
    it('should be able to list yours transactions', async () => {
        const response = await request(app)
            .get('/transaction')
            .set({ "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODBmNDM2M2E1NWFmNzZlYTMyZDIxNyIsInR5cGUiOjUsImlhdCI6MTU4NTYyMDk5MCwiZXhwIjoxMzI3OTc5MzQyMDN9.6a21Tm8Ue5X_WKgpQOn2cqOTl9lJlE52Nk4gt2nZrew' });

        expect(response.body[0]).toHaveProperty('_id');
    });
    it('should be able return list with test object about the purchase', async () => {
        const itemListPurchase = [{
            _id: "5e7e78fe5795032597320877",
            kind: "purchase",
            salesman: "5e6bd02413e34f37d9d68c81",
            breed: "5e6bdcf013e34f37d9d68c85",
            sexo: "f",
            date: "2018-07-01T00:00:00.000Z",
            birth: "2018-07-01T00:00:00.000Z",
            amount: 6,
            head_price: 700,
            freight: 100
          }];
        const response = await request(app)
            .get('/transaction')
            .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODBmNDM2M2E1NWFmNzZlYTMyZDIxNyIsInR5cGUiOjUsImlhdCI6MTU4NTYyMDk5MCwiZXhwIjoxMzI3OTc5MzQyMDN9.6a21Tm8Ue5X_WKgpQOn2cqOTl9lJlE52Nk4gt2nZrew" });

        expect(response.body).toEqual(expect.arrayContaining(itemListPurchase));
    });
    it('GET:: should be able return list with test object about the sale', async () => {
        const itemListSale = [{
            _id: "5e7f636d7c43af62b81550d9",
            kind: "sale",
            cattle: [
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
            ],
            buyer: "5e6beb7dba56ab37d900ff6c",
            purchase: "5e6bdcf013e34f37d9d68c85",
            date: "2020-02-09T02:00:00.000Z",
            amount: 10
          }];

        const response = await request(app)
            .get('/transaction')
            .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODBmNDM2M2E1NWFmNzZlYTMyZDIxNyIsInR5cGUiOjUsImlhdCI6MTU4NTYyMDk5MCwiZXhwIjoxMzI3OTc5MzQyMDN9.6a21Tm8Ue5X_WKgpQOn2cqOTl9lJlE52Nk4gt2nZrew" });

        expect(response.body).toEqual(expect.arrayContaining(itemListSale));
    });
});