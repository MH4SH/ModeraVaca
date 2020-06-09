const User = require('./User/Mutation');
const Farm = require('./Farm/Mutation');
const Data = require('./Data/Mutation');
const Purchase = require('./Purchase/Mutation');
const Sale = require('./Sale/Mutation');
const Born = require('./Born/Mutation');
const Dead = require('./Dead/Mutation');

module.exports = {
    ...User,
    ...Farm,
    ...Data,
    ...Purchase,
    ...Sale,
    ...Born,
    ...Dead
}