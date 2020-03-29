const gerate = require('../../src/utils/gerate');

describe('Config test for test', () => {
    it('Partners name is required', () => {
        const config = gerate(4, 8);
        expect(config).toBe(12);
    })
})