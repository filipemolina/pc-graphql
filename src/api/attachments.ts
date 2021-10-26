import { cacheTTL } from '@src/db';
import { ApiAttachment } from '@src/types';
import { addRelatedColumns, getConvertResultFunction } from '@src/utils';
import DataLoader from 'dataloader';
import { SQLDataSource } from 'datasource-sql';
import { RelatedTablesDictionary } from './types';

class AttachmentsApi extends SQLDataSource {
  tableName = 'dbo.Attachments';

  relatedTables: RelatedTablesDictionary = {
    ContentMetadata: {
      relatedTableName: 'dbo.ContentMetadatas',
      foreignKey: 'ContentMetadata_Id',
      columns: [
        'Id',
        'Name',
        'DateUploaded',
        'MimeType',
        'SizeInBytes',
        'Content_Id',
        'Thumbnail_Id',
      ],
    },
  };

  private getRelatedTables = () => {
    const query = this.db.from<ApiAttachment>(this.tableName);

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
    this.getRelatedTables().select<ApiAttachment[]>(
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
    }, {} as Record<string, ApiAttachment>);

    return ids.map((id) => this.convertResults(resultsDict[id])) || null;
  });

  private LoaderByDocId = new DataLoader(async (docIds: Readonly<string[]>) => {
    const results = await this.getBaseQuery()
      .whereIn(`${this.tableName}.DocumentVersion_Id`, docIds)
      .cache(cacheTTL);

    const resultsDict = docIds.reduce((acc, cur) => {
      acc[cur] = results.filter(
        (apiAttachment) => apiAttachment.DocumentVersion_Id === cur
      );

      return acc;
    }, {} as Record<string, ApiAttachment[]>);

    return docIds.map((id) =>
      resultsDict[id] ? resultsDict[id].map(this.convertResults) : []
    );
  });

  byId = (id: string) => this.Loader.load(id);

  byDocumentId = (docId: string) => this.LoaderByDocId.load(docId);
}

export { AttachmentsApi };
