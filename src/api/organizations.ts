import { databaseConfig } from '@src/db';
import { ApiOrganization, Organization } from '@src/types';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';
import { addRelatedColumns, convertResult } from './utils';

class OrganizationsDataSource extends SQLDataSource {
  tableName = 'dbo.Organizations';

  relatedTables: RelatedTablesDictionary = {
    Address: {
      tableName: 'dbo.Addresses',
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
      tableName: 'dbo.Contacts',
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
      tableName: 'dbo.Organizations',
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
      tableName: 'security.Profiles',
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

  private getOrgDefinition = () =>
    this.db
      .from<ApiOrganization>(this.tableName)
      .leftJoin(
        'dbo.Addresses as Address',
        `${this.tableName}.Address_Id`,
        'Address.Id'
      )
      .leftJoin(
        'dbo.Contacts as Contact',
        `${this.tableName}.Contact_Id`,
        'Contact.Id'
      )
      .leftJoin(
        `${this.tableName} as Parent`,
        `${this.tableName}.Parent_Id`,
        'Parent.Id'
      )
      .leftJoin(
        'security.Profiles as CreatedBy',
        `${this.tableName}.CreatedBy_Id`,
        'CreatedBy.Id'
      )
      .select(
        `${this.tableName}.*`,

        ...addRelatedColumns(this.relatedTables)
      );

  byId = async (orgId: string) => {
    const result: Organization = await this.getOrgDefinition()
      .where(`${this.tableName}.Id`, orgId)
      .first();

    return convertResult(result, this.relatedTables);
  };
}

const OrganizationsApi = new OrganizationsDataSource(databaseConfig);

export { OrganizationsApi };
