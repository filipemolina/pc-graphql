import { cacheTTL } from '@src/db';
import { ApiQuestion } from '@src/types';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';

class QuestionsApi extends SQLDataSource {
  tableName = 'dbo.QuestionsJson';

  questionLoader = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.db
      .from<ApiQuestion>(this.tableName)
      .whereIn('Id', ids)
      .cache(cacheTTL);

    const resultsDict = results.reduce((acc, cur) => {
      acc[cur.Id] = cur;
      return acc;
    }, {} as Record<string, ApiQuestion>);

    return ids.map((id) => resultsDict[id]);
  });

  byId = (id: string) => this.questionLoader.load(id);
}

export { QuestionsApi };
