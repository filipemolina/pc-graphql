import {
  QueryResult,
  RelatedTable,
  RelatedTablesDictionary,
} from '@src/api/types';

const addRelatedColumns = (
  relatedTables: Record<string, RelatedTable>,
  prefix = 'Related'
) => {
  const aliases = Object.keys(relatedTables);

  const relatedFields = aliases.flatMap((alias) => {
    const fields = relatedTables[alias].columns.map((col) => {
      return `${alias}.${col} as ${prefix}_${alias}_${col}`;
    });

    return fields;
  });

  return relatedFields;
};

const getConvertResultFunction = (
  relatedTables: RelatedTablesDictionary,
  tablePrefix = 'Related'
) => (result: QueryResult | null) => {
  if (!result) return null;

  const relatedAliases = Object.keys(relatedTables);
  const keys = Object.keys(result);

  const relatedObjects = keys.reduce((accumulator, currentKey) => {
    if (!currentKey.startsWith(`${tablePrefix}_`)) {
      accumulator[currentKey] = result[currentKey];
    } else {
      relatedAliases.map((alias) => {
        const prefix = `${tablePrefix}_${alias}_`;
        const fieldName = currentKey.split(prefix)[1];
        const foreignKey = relatedTables[alias].foreignKey;

        if (currentKey.startsWith(prefix) && result[foreignKey] !== null) {
          accumulator[alias] = {
            ...accumulator[alias],
            [fieldName]: result[currentKey],
          };
        }
      });
    }

    return accumulator;
  }, {} as Record<string, QueryResult | null>);

  return relatedObjects;
};

export { addRelatedColumns, getConvertResultFunction };
