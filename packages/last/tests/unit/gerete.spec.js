const gerate = require('../../src/gerate');

describe('Config test for test', () => {
    it('Sum 2 number.', () => {
        const config = gerate(4, 8);
        expect(config).toBe(12);
    })
})