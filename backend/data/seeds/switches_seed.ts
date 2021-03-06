import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('table_name').del();

  // Inserts seed entries
  await knex('table_name').insert([
    {
      id: 1,
      name: 'Cherry MX Brown',
      description:
        'The scratchiest linear switch on the market, marketed to gamers as a tactile switch.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
    },
    {
      id: 2,
      name: 'Holy Pandas',
      description:
        'One of the thockiest tactile switches on the market. Expensive, but loved by the community.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
    },
    {
      id: 3,
      name: 'Gateron Yellow',
      description:
        'Hailed as the budget king of linear switches, this switch provides a buttery smooth experience for anyone on a tight budget.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
    },
    {
      id: 4,
      name: 'Gateron Black Ink',
      description:
        'Premium smoothness from Gateron with a slightly heaview spring weight.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
    },
    {
      id: 5,
      name: 'Feker Pandas',
      description: "Fake Holy Pandas. At least they're better than MX Browns",
      elo: 1000.0,
      numMatches: 0,
      isVerified: false,
    },
  ]);
}
