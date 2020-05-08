const User = require('./User/Mutation.js');
const Data = require('./Data/Mutation.js');

module.exports = {
    ...User,
    ...Data
}