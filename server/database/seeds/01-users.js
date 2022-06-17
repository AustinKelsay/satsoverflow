exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {
              id: 1, 
              username: 'Alice', 
              created_at: new Date(),
              description: 'I am a user',
              pubkey: '2121212121212121212121212121212121212121212121212121212121212121212121212121212',
          },
          {
              id: 2, 
              username: 'Bob', 
              created_at: new Date(),
              description: 'Sats are my safehaven',
              pubkey: '420420420420420420420420420420420420420420420420420420420420420420420420420',
          },
          {
              id: 3, 
              username: 'Austin', 
              created_at: new Date(),
              description: 'Bitcoin is hope',
              pubkey: '69696969696969696969696969696969696969696969696969696969696969696969696969',
          },
        ]);
      });
  };