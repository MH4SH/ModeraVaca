const User = require('./User/Query');
const Data = require('./Data/Query');

module.exports = {
    ...User,
    ...Data
}