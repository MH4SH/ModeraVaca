const User = require('./User/Mutation.js');
const Card = require('./Card/Mutation.js');

module.exports = {
    ...User,
    ...Card
}