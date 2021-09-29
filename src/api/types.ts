export type RelatedTable = {
  tableName: string;
  foreignKey: string;
  columns: string[];
};

export type RelatedTablesDictionary = {
  [key: string]: RelatedTable;
};
