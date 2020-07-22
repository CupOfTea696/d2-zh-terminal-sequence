const Lazy = require('lazy.js')

module.exports = configName => {
  const data = require('./data/' + configName + '.json').solutions

  return knex => {
    // Deletes ALL existing entries
    return knex('solutions').insert(
        data.map(row => {
          return row.solution
        })
      ).then(() => {
        return knex('solutions').select()
      }).then(solutions => {
        return knex('configs').first('id').where('name', configName).then(config => {
          const terminals = data.map(row => {
            return {
              t1_left: row.t1.left,
              t1_right: row.t1.right,
              t2_left: row.t2.left,
              t2_right: row.t2.right,
              t3_left: row.t3.left,
              t3_right: row.t3.right,
              config_id: config.id,
              solution_id: Lazy(solutions).where({
                room: row.solution.room,
                terminal: row.solution.terminal
              }).pluck('id').first()
            }
          })

          return knex('terminals').insert(terminals)
        })
      })
  }
}