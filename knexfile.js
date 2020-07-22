// Update with your config settings.

module.exports = {

  client: 'sqlite3',
  connection: {
    filename: './src/db.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },

}
