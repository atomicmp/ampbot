require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.POSTGRES_DATABASE,
      directory: './src/services/database/migrations'
    },
    seeds: {
      directory: './src/services/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.POSTGRES_DATABASE
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.POSTGRES_DATABASE
    }
  }
}
