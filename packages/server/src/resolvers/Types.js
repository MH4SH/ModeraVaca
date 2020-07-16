const User = require('./User/Type');
const Data = require('./Data/Type');
const Animal = require('./Animal/Type');

module.exports = {
	...User,
	...Data,
	...Animal
}