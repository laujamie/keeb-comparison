import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('switches', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('elo').notNullable().defaultTo(1000.0);
    table.integer('numMatches').notNullable().defaultTo(0);
    table.boolean('isVerified').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('switches');
}
