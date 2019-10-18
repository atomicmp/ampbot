import Knex from "knex";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_USE_SSL,
} = process.env;

const useSSL = POSTGRES_USE_SSL === 'true';

console.log({
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
}, useSSL)


const knex = Knex({
  client: "pg",
  connection: {
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    ssl: useSSL,
    user: POSTGRES_USER,
  },
});

export default knex;
