exports.up = function (knex) {
  return knex.schema.table('switch', (t) => {
    t.boolean('verified').notNull().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('switch', (t) => {
    t.dropColumn('verified');
  });
};
