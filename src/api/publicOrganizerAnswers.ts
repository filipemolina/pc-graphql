import DataLoader from 'dataloader';

import { cacheTTL } from '@src/db';
import { PublicOrganizerAnswer } from '@src/types';
import { SQLDataSource } from 'datasource-sql';

class PublicOrganizerAnswersApi extends SQLDataSource {
  tableName = 'dbo.PublicOrganizerAnswers';

  private LoadMultiple = new DataLoader(async (ids: Readonly<string[]>) => {
    const results = await this.db
      .from<PublicOrganizerAnswer>(this.tableName)
      .select('*')
      .whereIn('DocumentVersion_Id', ids)
      .cache(cacheTTL);

    const resultsDict = ids.reduce((acc, cur) => {
      acc[cur] = results.filter((result) => result.DocumentVersion_Id === cur);

      return acc;
    }, {} as Record<string, PublicOrganizerAnswer[]>);

    return ids.map((id) => resultsDict[id] || []);
  });

  byDocumentVersionId = (id: string) => this.LoadMultiple.load(id);
}

export { PublicOrganizerAnswersApi };
