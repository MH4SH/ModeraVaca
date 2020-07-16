const User = require('./User/Query');
const Data = require('./Data/Query');
const Purchase = require('./Purchase/Query');
const Sale = require('./Sale/Query');
const Birth = require('./Birth/Query');
const Dead = require('./Dead/Query');

module.exports = {
	...User,
	...Data,
	...Purchase,
	...Sale,
	...Birth,
	...Dead
}