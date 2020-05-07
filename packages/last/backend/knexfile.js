// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    database: 'moderavaca',
    user:     'root',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/database/migrations'
  }

};
