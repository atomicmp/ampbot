import Knex from "knex";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_USE_SSL,
} = process.env;

const knex = Knex({
  client: "pg",
  connection: {
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    ssl: POSTGRES_USE_SSL,
    user: POSTGRES_USER,
  },
});

export default knex;
