exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('configs').del()
    .then(() => {
      return knex('configs').insert([
        {name: 'arc'},
        {name: 'solar'},
        {name: 'void'},
      ])
    })
}