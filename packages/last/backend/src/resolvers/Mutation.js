const User = require('./User/Mutation');
const Farm = require('./Farm/Mutation');
const Data = require('./Data/Mutation');
const Card = require('./Card/Mutation');
const Purchase = require('./Purchase/Mutation');
const Sale = require('./Sale/Mutation');

module.exports = {
    ...User,
    ...Farm,
    ...Data,
    ...Card,
    ...Purchase,
    ...Sale
}