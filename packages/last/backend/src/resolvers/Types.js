const User = require('./User/Type');
const Card = require('./Card/Type');

module.exports = {
    ...User,
    ...Card
}