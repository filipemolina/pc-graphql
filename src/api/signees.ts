import { cacheTTL } from '@src/db';
import { ApiSignee } from '@src/types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';

class SigneeApi extends SQLDataSource {
  tableName = 'dbo.Signees';

  relatedTables: RelatedTablesDictionary = {
    Profile: {
      relatedTableName: 'Security.Profiles',
      foreignKey: 'Profile_Id',
      columns: [
        'Id',
        'IsDefault',
        'DateCreated',
        'User_Id',
        'Organization_Id',
        'Status',
        'Notifications',
        'ExternalId',
        'Role',
      ],
    },
  };

  private getRelatedTables = () => {
    const query = this.db.from<ApiSignee>(this.tableName);

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
    this.getRelatedTables().select<ApiSignee[]>(
      `${this.tableName}.*`,

      ...addRelatedColumns(this.relatedTables)
    );

  private convertResults = getConvertResultFunction(this.relatedTables);

  private Loader = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.getBaseQuery()
      .whereIn(`${this.tableName}.Id`, ids)
      .cache(cacheTTL);

    const resultsDict = results.reduce((acc, cur) => {
      acc[cur.Id] = cur;
      return acc;
    }, {} as Record<string, ApiSignee>);

    return ids.map((id) => this.convertResults(resultsDict[id] || null));
  });

  byId = (id: string) => this.Loader.load(id);
}

export { SigneeApi };
