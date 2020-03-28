const gerate = require('../../src/utils/gerate');

describe('Config test for test', () => {

    test('Partners name is required', () => {
        const config = gerate(4, 8);
        expect(config).toBe(12);
    })
    test('Partners name is required', () => {
        const config = gerate(4, 8);
        expect(config).toBe(12);
    })
    test('Partners name is required', () => {
        const config = gerate(4, 8);
        expect(config).toBe(12);
    })
})