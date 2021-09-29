import { databaseConfig } from '@src/db';
import { ApiDocument } from '@src/types';
import { SQLDataSource } from 'datasource-sql';

class DocumentsDataSource extends SQLDataSource {
  private tableName = 'dbo.Documents';

  all = async () => this.db.select('*').from<ApiDocument>(this.tableName);

  byOrganizationId = async (orgId: string) =>
    this.db
      .select('*')
      .from<ApiDocument>(this.tableName)
      .where('Organization_Id', orgId);
}

const DocumentsApi = new DocumentsDataSource(databaseConfig);

export { DocumentsApi };
