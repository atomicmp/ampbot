exports.up = (knex, Promise) => {
  return knex.schema.createTable('roles', table => {
    table.increments('role_id').primary();
    table.string('role_name', 20).notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('roles');
};
