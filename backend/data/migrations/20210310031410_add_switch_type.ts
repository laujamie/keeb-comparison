import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('switches', (table) => {
    table.string('type').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('switches', (table) => {
    table.dropColumn('type');
  });
}
