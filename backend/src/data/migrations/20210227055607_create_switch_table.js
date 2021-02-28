exports.up = function (knex) {
  return knex.schema.createTable('switch', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNullable();
    t.string('description').notNullable();
    t.float('elo').notNullable();
    t.integer('numMatches').notNullable();
  });
};

exports.down = function (knex) {};
