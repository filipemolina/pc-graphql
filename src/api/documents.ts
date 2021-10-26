import { cacheTTL } from '@src/db';
import { ApiDocument } from '@src/types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';

class DocumentsApi extends SQLDataSource {
  tableName = 'dbo.Documents';

  relatedTables: RelatedTablesDictionary = {
    Organization: {
      relatedTableName: 'dbo.Organizations',
      foreignKey: 'Organization_Id',
      columns: [
        'Id',
        'Name',
        'NumberOfStudents',
        'DivisionName',
        'Disclaimer',
        'DateCreated',
        'IsEnabled',
        'WebPageUrl',
        'FormsRequireApproval',
        'Address_Id',
        'Contact_Id',
        'Parent_Id',
        'LogoMetadata_Id',
        'Domain',
        'StripeBillingId',
        'TrialEnding',
        'ApiKey',
        'EmailSettings_Id',
        'CreatedBy_Id',
        'NameForCommunications',
        'PaymentSettings_Id',
        'EditionId',
        'SequentialId',
        'OrganizationTypeCode',
      ],
    },
  };

  private getRelatedTables = () => {
    const query = this.db.from<ApiDocument>(this.tableName);

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
    this.getRelatedTables().select<ApiDocument[]>(
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
    }, {} as Record<string, ApiDocument>);

    return ids.map((id) => this.convertResults(resultsDict[id]) || null);
  });

  private LoaderByOrgId = new DataLoader(async (orgIds: Readonly<string[]>) => {
    const results = await this.getBaseQuery()
      .whereIn(`${this.tableName}.Organization_Id`, orgIds)
      .cache(cacheTTL);

    const resultsDict = orgIds.reduce((acc, cur) => {
      acc[cur] = results.filter((result) => result.Organization_Id === cur);

      return acc;
    }, {} as Record<string, ApiDocument[]>);

    return orgIds.map((orgId) =>
      resultsDict[orgId] ? resultsDict[orgId].map(this.convertResults) : []
    );
  });

  byId = async (id: string) => this.Loader.load(id);

  byOrganizationId = async (orgId: string) => this.LoaderByOrgId.load(orgId);
}

export { DocumentsApi };
