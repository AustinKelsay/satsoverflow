// Update with your config settings.

module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './database/satsoverflow.db3'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' }
    },
  
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './database/satsoverflow-test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      }
    },
  
    // production: {
    //   client: 'pg',
    //   connection: process.env.DATABASE_URL,
  
    //   migrations: {
    //     directory: './database/migrations'
    //   },
    //   seeds: {
    //     directory: './database/seeds'
    //   }
    // }
  };