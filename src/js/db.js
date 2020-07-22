// import { Connector, RelationTypes, TransactionModes } from './lib/indexeddb-orm'
import Lazy from 'lazy.js'
import data from './data.json'

export default {
  arc: Lazy(data.arc),
  solar: Lazy(data.solar),
  void: Lazy(data.void),
}

// const db = new Connector({
//   name: 'db',
//   version: 2,
//   tables: [
//     {
//       name: 'configs',
//       primary: 'id',
//       columns: [
//         { name: 'name' },
//       ],
//     },
//     {
//       name: 'solutions',
//       primary: 'id',
//       columns: [
//         { name: 'room' },
//         { name: 'terminal' },
//       ],
//     },
//     {
//       name: 'terminals',
//       primary: 'id',
//       columns: [
//         { name: 't1_left' },
//         { name: 't1_right' },
//         { name: 't2_left' },
//         { name: 't2_right' },
//         { name: 't3_left' },
//         { name: 't3_right' },
//         { name: 'config_id' },
//         { name: 'solution_id', attributes: { unique: true } },
//       ],
//     },
//   ],
// })
//
// const openTransaction = db => {
//   const { models, transaction } = db.openTransaction(TransactionModes.Write)
//
//   const Config = models.configs
//   const Solution = models.solutions
//   const Terminal = models.terminals.with([
//     { model: Config, foreignKey: 'config_id', type: RelationTypes.HasOne },
//     { model: Solution, foreignKey: 'solution_id', type: RelationTypes.HasOne },
//   ])
//
//   return { models: { Config, Solution, Terminal }, transaction }
// }
//
// export default db.connect().then(async models => {
//   const Config = models.configs
//   const Solution = models.solutions
//   const Terminal = models.terminals.with([
//     { model: Config, foreignKey: 'config_id', type: RelationTypes.HasOne },
//     { model: Solution, foreignKey: 'solution_id', type: RelationTypes.HasOne },
//   ])
//
//   const tables = { Config, Solution, Terminal }
//
//   if (await Solution.count()) {
//     console.log('local data found')
//
//     return tables
//   }
//
//   console.log('seeding configs table')
//
//   const configSeed = Config.createMultiple([
//     { name: 'arc' },
//     { name: 'solar' },
//     { name: 'void' },
//   ])
//
//   console.log('fetching data')
//
//   const response = await fetch('/js/data.json')
//
//   if (! response.ok) {
//     throw new Error(`Failed to get the config`)
//   }
//
//   const configs = Lazy(await response.json())
//   const configsTable = Lazy(await configSeed)
//
//   window.configs = configs
//
//   let actions = []
//
//   configs.each(async (config, name) => {
//     console.log(`getting config id`)
//     const config_id = configsTable.findWhere({ name }).id
//     console.log(config_id)
//
//     const { Solution } = openTransaction(db).models
//
//     console.log(`seeding ${name} solutions`)
//     const solutions = Lazy(await Solution.createMultiple(config.map(entry => entry.solution)))
//     console.log(solutions.toArray())
//
//     const { Terminal } = openTransaction(db).models
//
//     console.log(`seeding ${name} terminals`)
//     await Terminal.createMultiple(config.map(entry => {
//       return {
//         t1_left: entry.t1.left,
//         t1_right: entry.t1.right,
//         t2_left: entry.t2.left,
//         t2_right: entry.t2.right,
//         t3_left: entry.t3.left,
//         t3_right: entry.t3.right,
//         config_id,
//         solution_id: solutions.where({
//           room: entry.solution.room,
//           terminal: entry.solution.terminal
//         }).pluck('id').first()
//       }
//     }))
//   })
//
//   console.log(actions)
//
//   await Promise.all(actions)
//
//   return tables
// }).catch(e => console.log(e))
