import { cacheTTL } from '@src/db';
import { ApiResponse } from '@src/types';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';

class ResponsesApi extends SQLDataSource {
  tableName = 'dbo.Responses';

  private Loader = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.db
      .from<ApiResponse>(this.tableName)
      .whereIn('Id', ids)
      .cache(cacheTTL);

    const resultsDict = results.reduce((acc, cur) => {
      acc[cur.Id] = cur;
      return acc;
    }, {} as Record<string, ApiResponse>);

    return ids.map((id) => resultsDict[id] || null);
  });

  byId = (id: string) => this.Loader.load(id);

  all = () => this.db.from<ApiResponse>(this.tableName).cache(cacheTTL);
}

export { ResponsesApi };
