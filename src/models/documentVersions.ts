import { ContextType } from '@src/api';
import { DocumentVersion } from '@src/types';

const DocumentVersionsModel = {
  getDocumentVersionById: async (
    { dataSources: { DocumentVersions } }: ContextType,
    id?: string | null
  ) => {
    const result = id ? DocumentVersions.byId(id) : null;

    return (result as unknown) as DocumentVersion | null;
  },
};

export { DocumentVersionsModel };
