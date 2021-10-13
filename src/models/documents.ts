import { ContextType } from '@src/api';
import { Document } from '@src/types';

const DocumentsModel = {
  getDocumentsForOrganization: async (
    { dataSources: { Documents } }: ContextType,
    orgId: string
  ) => {
    const results = await Documents.byOrganizationId(orgId);

    return (results as unknown) as Document[];
  },

  getDocumentById: async (
    { dataSources: { Documents } }: ContextType,
    docId: string
  ) => {
    const result = await Documents.byId(docId);

    return (result as unknown) as Document | null;
  },
};

export { DocumentsModel };
