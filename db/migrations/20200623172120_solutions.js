
exports.up = function (knex) {
  return knex.schema.createTable('solutions', table => {
    table.increments()
    table.string('room')
    table.integer('terminal')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('solutions')
}
