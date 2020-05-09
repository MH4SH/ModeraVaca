const User = require('./User/Query');
const Data = require('./Data/Query');
const Card = require('./Card/Query');
const Purchase = require('./Purchase/Query');
const Sale = require('./Sale/Query');

module.exports = {
    ...User,
    ...Data,
    ...Card,
    ...Purchase,
    ...Sale
}