import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('switches').del();

  // Inserts seed entries
  await knex('switches').insert([
    {
      name: 'Cherry MX Brown',
      description:
        'The scratchiest linear switch on the market, marketed to gamers as a tactile switch.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
      type: 'tactile',
    },
    {
      name: 'Holy Pandas',
      description:
        'One of the thockiest tactile switches on the market. Expensive, but loved by the community.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
      type: 'tactile',
    },
    {
      name: 'Gateron Yellow',
      description:
        'Hailed as the budget king of linear switches, this switch provides a buttery smooth experience for anyone on a tight budget.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
      type: 'linear',
    },
    {
      name: 'Gateron Black Ink',
      description:
        'Premium smoothness from Gateron with a slightly heaview spring weight.',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
      type: 'linear',
    },
    {
      name: 'Kailh Box Jades',
      description: 'Thicc clicks that make all your friends hate you',
      elo: 1000.0,
      numMatches: 0,
      isVerified: true,
      type: 'clicky',
    },
    {
      name: 'Feker Pandas',
      description: "Fake Holy Pandas. At least they're better than MX Browns",
      elo: 1000.0,
      numMatches: 0,
      isVerified: false,
      type: 'tactile',
    },
  ]);
}
