const User = require('./User/Type');
const Card = require('./Card/Type');
const CardItem = require('./CardItem/Type');

module.exports = {
    ...User,
    ...Card,
    ...CardItem
}