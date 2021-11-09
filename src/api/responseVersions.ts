import { cacheTTL } from '@src/db';
import { ApiResponseVersion } from '@src/types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';

class ResponseVersionApi extends SQLDataSource {
  tableName = 'dbo.ResponseVersions';

  relatedTables: RelatedTablesDictionary = {
    CompletedBy: {
      relatedTableName: 'Security.Profiles',
      foreignKey: 'CompletedBy_Id',
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
    const query = this.db.from<ApiResponseVersion>(this.tableName);

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
    this.getRelatedTables().select<ApiResponseVersion[]>(
      `${this.tableName}.*`,

      ...addRelatedColumns(this.relatedTables)
    );

  private convertResults = getConvertResultFunction(this.relatedTables);

  private Loader = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.getBaseQuery()
      .whereIn('Id', ids)
      .cache(cacheTTL);

    const resultsDict = results.reduce((acc, cur) => {
      acc[cur.Id] = cur;
      return acc;
    }, {} as Record<string, ApiResponseVersion>);

    return ids.map((id) => this.convertResults(resultsDict[id] || null));
  });

  private LoaderByFormId = new DataLoader(
    async (formIds: Readonly<string[]>) => {
      const results = await this.getBaseQuery()
        .whereIn('Form_Id', formIds)
        .cache(cacheTTL);

      const resultsDict = formIds.reduce((acc, cur) => {
        acc[cur] = results.filter(
          (responseVersion) => responseVersion.Form_Id === cur
        );

        return acc;
      }, {} as Record<string, ApiResponseVersion[]>);

      return formIds.map((formId) =>
        resultsDict[formId] ? resultsDict[formId].map(this.convertResults) : []
      );
    }
  );

  byId = (id: string) => this.Loader.load(id);

  byFormId = (formId: string) => this.LoaderByFormId.load(formId);
}

export { ResponseVersionApi };
