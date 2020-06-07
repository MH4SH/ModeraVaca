const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration[process.env.C_TYPE]);

module.exports = connection;