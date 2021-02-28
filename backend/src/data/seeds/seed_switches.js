exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('switch')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('switch').insert([
        {
          id: 1,
          name: 'Cherry MX Brown',
          description:
            'The scratchiest linear switch on the market, marketed to gamers as a tactile switch.',
          elo: 1000.0,
          numMatches: 0,
        },
        {
          id: 2,
          name: 'Holy Pandas',
          description:
            'One of the thockiest tactile switches on the market. Expensive, but loved by the community.',
          elo: 1000.0,
          numMatches: 0,
        },
        {
          id: 3,
          name: 'Gateron Yellow',
          description:
            'Hailed as the budget king of linear switches, this switch provides a buttery smooth experience for anyone on a tight budget.',
          elo: 1000.0,
          numMatches: 0,
        },
      ]);
    });
};
