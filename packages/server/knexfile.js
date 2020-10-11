// Update with your config settings.
const path = require('path');
require('dotenv').config();

module.exports = {
  dev: {
	  migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'developer',
      password : 'igXwrQ12Ja',
      database : 'moderavaca_dev'
    }
  },
  test: {
	  migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '1IUHA__321ASD',
      database : 'moderavaca_test'
    }
  },
  production: {
	  migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  }
};
