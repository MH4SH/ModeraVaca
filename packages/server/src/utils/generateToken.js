const jwt = require('jsonwebtoken');

module.exports = (params = {id}, expiresIn = 86400) => {
	return jwt.sign(params, process.env.HASH_1_SECRET, {
		expiresIn
	})

}

