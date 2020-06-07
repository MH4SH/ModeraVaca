const generateToken = require('../../src/utils/gerate');

describe('Genereta Token', () => {
    it('should generate an unique ID', () => {
        const token = generateToken(4, 2);

        expect(token).toEqual(6);
    })
})