
exports.up = function (knex) {
  return knex.schema.createTable('terminals', table => {
    table.increments()
    table.integer('t1_left')
    table.integer('t1_right')
    table.integer('t2_left')
    table.integer('t2_right')
    table.integer('t3_left')
    table.integer('t3_right')
    table.integer('config_id').unsigned()
    table.integer('solution_id').unsigned()

    table.foreign('config_id').references('configs.id')
    table.foreign('solution_id').references('solutions.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('terminals')
}
