exports.up = function (knex) {
  return knex.schema.alterTable('users', (t) => {
    t.unique('sub');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (t) => {
    t.dropUnique('sub');
  });
};
