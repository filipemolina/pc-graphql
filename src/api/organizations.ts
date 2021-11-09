import { cacheTTL } from '@src/db';
import { ApiOrganization } from '@src/types';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';

class OrganizationsApi extends SQLDataSource {
  tableName = 'dbo.Organizations';

  relatedTables: RelatedTablesDictionary = {
    Address: {
      relatedTableName: 'dbo.Addresses',
      foreignKey: 'Address_Id',
      columns: [
        'Id',
        'Address1',
        'Address2',
        'Postal',
        'City',
        'TimeZone',
        'Country',
        'Subdivision',
      ],
    },
    Contact: {
      relatedTableName: 'dbo.Contacts',
      foreignKey: 'Contact_Id',
      columns: [
        'Id',
        'Name',
        'Phone',
        'Email',
        'Role',
        'Organization_Id',
        'SisContactOrganization_Id',
      ],
    },
    Parent: {
      relatedTableName: 'dbo.Organizations',
      foreignKey: 'Parent_Id',
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
    CreatedBy: {
      relatedTableName: 'Security.Profiles',
      foreignKey: 'CreatedBy_Id',
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
    const query = this.db.from<ApiOrganization>(this.tableName);

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
    this.getRelatedTables().select<ApiOrganization[]>(
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
    }, {} as Record<string, ApiOrganization>);

    return ids.map((id) => this.convertResults(resultsDict[id]) || null);
  });

  byId = async (orgId: string) => this.Loader.load(orgId);
}

export { OrganizationsApi };
