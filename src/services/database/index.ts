import Knex from "knex";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_USE_SSL,
} = process.env;

console.log({
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_USE_SSL,
})


const knex = Knex({
  client: "pg",
  connection: {
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    ssl: POSTGRES_USE_SSL,
    user: POSTGRES_USER,
  },
});

export default knex;
