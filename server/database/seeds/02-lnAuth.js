exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('lnAuth').del()
      .then(function () {
        // Inserts seed entries
        return knex('lnAuth').insert([
          {
              id: 1, 
              k1: '6969696969696969696969696969696969696969696969696969696969696969696969',
              pubkey: '696969696969696969696969696969696969696969696969696969696969696969',
              created_at: new Date(),
              updated_at: new Date(),
          },
          {
              id: 2, 
              k1: '420420420420420420420420420420420420420420420420420420420420420420420420420',
              pubkey: '420420420420420420420420420420420420420420420420420420420420420420',
              created_at: new Date(),
              updated_at: new Date(),
          },
          {
              id: 3, 
              k1: '2121212121212121212121212121212121212121212121212121212121212121212121212121212',
              pubkey: '212121212121212121212121212121212121212121212121212121212121212121',
              created_at: new Date(),
              updated_at: new Date(),
          },
        ]);
      });
  };