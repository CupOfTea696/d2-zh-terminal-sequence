const knex = require('knex')(require('./knexfile'))

knex('terminals').select()
  .then(r => {
    console.log(r)

    return knex('terminals')
      .join('configs', 'terminals.config_id', 'configs.id')
      .join('solutions', 'terminals.solution_id', 'solutions.id')
      .first('solutions.room', 'solutions.terminal')
      .where({
        'configs.name': 'arc',
        'terminals.t1_left': 1,
        'terminals.t1_right': 6,
      })
  })
  .then(r => console.log(r))
  .catch(e => console.error(e))
  .finally(process.exit)

