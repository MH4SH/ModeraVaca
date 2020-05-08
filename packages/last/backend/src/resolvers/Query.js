const User = require('./User/Query');
const Data = require('./Data/Query');
const Card = require('./Card/Query');

module.exports = {
    ...User,
    ...Data,
    ...Card
}