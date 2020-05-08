const User = require('./User/Mutation.js');
const Farm = require('./Farm/Mutation.js');
const Data = require('./Data/Mutation.js');
const Card = require('./Card/Mutation.js');

module.exports = {
    ...User,
    ...Farm,
    ...Data,
    ...Card
}