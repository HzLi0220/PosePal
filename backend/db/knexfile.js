// knexfile.js
module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        // change this to './dev.sqlite3' before running migration
        // change this to './db/dev.sqlite3' before running the server
        filename: './db/dev.sqlite3'
      },
      useNullAsDefault: true
    }
  };
  