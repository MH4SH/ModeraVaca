const jwt = require('jsonwebtoken');

module.exports = (params = {id}) => {
    return jwt.sign(params, process.env.HASH_1_SECRET, {
        expiresIn: 86400,
    })

}

