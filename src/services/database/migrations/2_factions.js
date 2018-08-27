exports.up = (knex, Promise) => {
  return knex.schema.createTable('factions', table => {
    table.increments('faction_id').primary();
    table.string('faction_name', 30).notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('factions');
};
