const User = require('./User/Query');
const Card = require('./Card/Query');

module.exports = {
    ...User,
    ...Card
}