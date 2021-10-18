import { cacheTTL } from '@src/db';
import { ApiDocument } from '@src/types';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';

class DocumentsApi extends SQLDataSource {
  tableName = 'dbo.Documents';

  private documentLoader = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.db
      .from<ApiDocument>(this.tableName)
      .whereIn(`${this.tableName}.Id`, ids)
      .cache(cacheTTL);

    const resultsDict = results.reduce((acc, cur) => {
      acc[cur.Id] = cur;
      return acc;
    }, {} as Record<string, ApiDocument>);

    return ids.map((id) => resultsDict[id] || null);
  });

  byId = async (id: string) => {
    const result = await this.documentLoader.load(id);

    return result || null;
  };

  byOrganizationId = async (orgId: string) =>
    this.db
      .select('*')
      .from<ApiDocument>(this.tableName)
      .where('Organization_Id', orgId);
}

export { DocumentsApi };
