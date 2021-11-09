import { ContextType } from '@src/api';
import { DocumentVersion } from '@src/types';
import { decodeHash } from '@src/utils/hashInteger';

const DocumentVersionsModel = {
  getDocumentVersionById: async (
    { dataSources: { DocumentVersions } }: ContextType,
    id?: string | null
  ) => {
    const result = id ? DocumentVersions.byId(id) : null;

    return (result as unknown) as DocumentVersion | null;
  },

  getDocumentVersionByHashedId: async (
    { dataSources: { DocumentVersions } }: ContextType,
    hashedId: string
  ) => {
    const sequentialId = decodeHash(hashedId) as number;

    const result = DocumentVersions.latestBySequentialId(sequentialId);

    return (result as unknown) as DocumentVersion | null;
  },
};

export { DocumentVersionsModel };
