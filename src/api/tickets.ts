import { ApiTicket } from '@src/types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';

class TicketsApi extends SQLDataSource {
  tableName = 'dbo.Tickets';

  columns = [
    `${this.tableName}.Id`,
    `${this.tableName}.Name`,
    `${this.tableName}.Type_Id`,
    `${this.tableName}.MinimumAmountPerOrder`,
    `${this.tableName}.MaximumAmountPerOrder`,
    `${this.tableName}.PassAlongFees`,
    `${this.tableName}.ParentPays`,
    `${this.tableName}.SchoolCollects`,
    `${this.tableName}.GroupKey`,
    `${this.tableName}.Inventory_Id`,
    `${this.tableName}.DocumentVersion_Id`,
    `${this.tableName}.FormQuestions_Id`,
  ];

  relatedTables: RelatedTablesDictionary = {
    TicketType: {
      relatedTableName: 'dbo.TicketTypes',
      foreignKey: 'Type_Id',
      columns: ['Id', 'Name', 'Code', 'DefaultPrice'],
    },
    Inventory: {
      relatedTableName: 'dbo.Inventories',
      foreignKey: 'Inventory_Id',
      columns: ['Id', 'IsLimited'],
    },
  };

  private getRelatedTables = () => {
    const query = this.db.from<ApiTicket>(this.tableName);

    const relatedTables = Object.keys(this.relatedTables);

    return relatedTables.reduce((query, alias) => {
      const { relatedTableName, foreignKey } = this.relatedTables[alias];

      query.leftJoin(
        `${relatedTableName} as ${alias}`,
        `${this.tableName}.${foreignKey}`,
        `${alias}.Id`
      );

      return query;
    }, query);
  };

  private getBaseQuery = () =>
    this.getRelatedTables()
      .select<ApiTicket>(
        ...this.columns,

        ...addRelatedColumns(this.relatedTables)
      )
      .sum('LI.Quantity as Related_Inventory_Quantity')
      .leftJoin('dbo.LedgerItems as LI', 'LI.Inventory_Id', 'Inventory.Id')
      .groupBy(
        ...this.columns,
        ...this.relatedTables.TicketType.columns.map(
          (column) => `TicketType.${column}`
        ),
        ...this.relatedTables.Inventory.columns.map(
          (column) => `Inventory.${column}`
        )
      );

  private convertResults = getConvertResultFunction(this.relatedTables);

  private LoaderByDocId = new DataLoader(async (docIds: Readonly<string[]>) => {
    const results: ApiTicket[] = await this.getBaseQuery().whereIn(
      'DocumentVersion_Id',
      docIds
    );

    const resultsDict = docIds.reduce((acc, cur) => {
      acc[cur] = results.filter((result) => result.DocumentVersion_Id === cur);

      return acc;
    }, {} as Record<string, ApiTicket[]>);

    return docIds.map((id) =>
      resultsDict[id] ? resultsDict[id].map(this.convertResults) : []
    );
  });

  byDocumentVersionId = (id: string) => this.LoaderByDocId.load(id);
}

export { TicketsApi };
