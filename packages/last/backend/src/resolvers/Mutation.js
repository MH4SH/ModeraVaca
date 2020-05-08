const User = require('./User/Mutation.js');
const Data = require('./Data/Mutation.js');
const Card = require('./Card/Mutation.js');

module.exports = {
    ...User,
    ...Data,
    ...Card
}