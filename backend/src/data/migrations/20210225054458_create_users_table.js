exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('role').notNull();
    t.string('sub').notNull();
  });
};

exports.down = function (knex) {};
