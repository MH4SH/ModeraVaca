const User = require('./User/Mutation');
const Farm = require('./Farm/Mutation');
const Data = require('./Data/Mutation');
const Purchase = require('./Purchase/Mutation');
const Sale = require('./Sale/Mutation');
const Birth = require('./Birth/Mutation');
const Dead = require('./Dead/Mutation');

module.exports = {
	...User,
	...Farm,
	...Data,
	...Purchase,
	...Sale,
	...Birth,
	...Dead
}