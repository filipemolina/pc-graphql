export type RelatedTable = {
  relatedTableName: string;
  foreignKey: string;
  columns: string[];
};

export type RelatedTablesDictionary = {
  [key: string]: RelatedTable;
};

export type QueryResult = Record<string, {} | null>;
