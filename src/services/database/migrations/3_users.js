exports.up = async (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary();
    table.string('username', 24).notNullable();
    table.binary('hash').notNullable();
    table
      .integer('role')
      .unsigned()
      .defaultTo(3)
      .notNullable()
      .references('role_id')
      .inTable('roles');
    table
      .integer('faction')
      .unsigned()
      .references('faction_id')
      .inTable('factions');
    table.string('discord_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('last_seen').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex, Promise) => {
  return knex.schema.dropTable('users');
};
