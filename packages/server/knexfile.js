// Update with your config settings.

module.exports = {
  dev: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dev.sqlite3',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite3',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'sqlite3',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }
};
