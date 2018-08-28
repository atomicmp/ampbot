require('dotenv').config()
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: POSTGRES_HOST,
      database: POSTGRES_DATABASE,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: POSTGRES_DATABASE,
      directory: './src/services/database/migrations'
    },
    seeds: {
      directory: './src/services/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DATABASE,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: POSTGRES_DATABASE
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DATABASE,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: POSTGRES_DATABASE
    }
  }
}
