exports.seed = function(knex: any) {
    // Deletes ALL existing entries
    return knex('questions').del()
      .then(function () {
        // Inserts seed entries
        return knex('questions').insert([
          {
            id: 1, 
            user_id: 2,
            user: 'Bob',
            title: 'How to use the API?',
            description: 'I need help with the API.',
            bounty: 100,
            answered: true
          },
          {
            id: 2, 
            user_id: 2,
            user: 'Bob',
            title: 'How to connect polar to API?',
            description: 'I need help with connecting polar to API.',
            bounty: 69420,
            answered: false
          },
          {
            id: 3, 
            user_id: 1,
            user: 'Alice',
            title: 'How do I run bitcoin core in testnet?',
            description: 'I have bitcoin core running but how do I swith it to testnet?',
            bounty: 333,
            answered: false
          }
        ]);
      });
  };