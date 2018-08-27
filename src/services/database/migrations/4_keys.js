exports.up = (knex, Promise) => {
  return knex.schema.createTable('keys', table => {
    table.increments('key_id').primary();
    table.string('key', 23).notNullable();
    table
      .integer('owner')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users');
    table
      .integer('created_by')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('keys');
};
