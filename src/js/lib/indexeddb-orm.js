import { Connector as BaseConnector } from 'indexeddb-orm'
import { Model } from 'indexeddb-orm/dist/es2015/models/model'
import { TransactionModes } from 'indexeddb-orm/dist/es2015/models/model.interface'

export { Model, Migration, RelationTypes, CursorDirection } from 'indexeddb-orm'
export { TransactionModes }

export class Connector extends BaseConnector {
  /**
   * Opens a transaction to allow fine control on commits.
   * @param mode
   */
  openTransaction(mode) {
    if (this.database === null) {
      throw new Error('First initialize the connection using connect.')
    }

    const transaction = this.database.transaction(this.migrationSchema.tables.map(table => table.name), mode)

    const models = {};

    for (const table of this.migrationSchema.tables) {
      Object.defineProperty(models, table.name, {
        get: () => {
          const model = new Model(this.database, table, this);
          model.setTransaction(transaction);
          return model;
        }
      });
    }

    return {models, transaction};
  }
}
