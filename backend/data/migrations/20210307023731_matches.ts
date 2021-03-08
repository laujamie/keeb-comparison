import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('matches', (table) => {
    table.increments('id').unsigned().primary();
    table
      .integer('switch_one_id')
      .references('id')
      .inTable('switches')
      .notNullable()
      .onDelete('cascade');
    table
      .integer('switch_two_id')
      .references('id')
      .inTable('switches')
      .notNullable()
      .onDelete('cascade');
    table.dateTime('completed_date');
    table.boolean('switch_one_win');
    table.string('uid').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('matches');
}
