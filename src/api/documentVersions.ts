import { cacheTTL } from '@src/db';
import { ApiDocumentVersion } from '@src/types';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';

class DocumentVersionsApi extends SQLDataSource {
  tableName = 'dbo.DocumentVersions';

  relatedTables: RelatedTablesDictionary = {
    Fee: {
      relatedTableName: 'dbo.Fees',
      foreignKey: 'Fee_Id',
      columns: [
        'Id',
        'EffectiveDate',
        'ProviderRate',
        'ProviderFlat',
        'ProviderSchoolCollectsToParentPaysRate',
        'PermissionClickRate',
        'PermissionClickFlat',
        'PermissionClickSchoolCollectsToParentPaysRate',
        'PaymentProvider_Id',
        'PermissionClickPerTicketFlat',
        'ProviderPerOrderFlatWhenUsingPerTicketFlat',
        'FeeZone',
      ],
    },
    CreatedBy: {
      foreignKey: 'CreatedBy_Id',
      relatedTableName: 'Security.Profiles',
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
    LastUpdatedBy: {
      foreignKey: 'LastUpdatedBy_Id',
      relatedTableName: 'Security.Profiles',
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
    const query = this.db.from<ApiDocumentVersion>(this.tableName);

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
    this.getRelatedTables().select(
      `${this.tableName}.*`,

      ...addRelatedColumns(this.relatedTables)
    );

  private convertResults = getConvertResultFunction(this.relatedTables);

  private documentVersionLoader = new DataLoader(
    async (ids: Readonly<string[]>) => {
      const results = await this.getBaseQuery()
        .whereIn(`${this.tableName}.Id`, ids)
        .cache(cacheTTL);

      const resultsDict = results.reduce((acc, cur) => {
        acc[cur.Id] = cur;
        return acc;
      }, {} as Record<string, Record<string, {}>>);

      return ids.map((id) => this.convertResults(resultsDict[id]) || null);
    }
  );

  byId = (id: string) => this.documentVersionLoader.load(id);
}

export { DocumentVersionsApi };
