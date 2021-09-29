import { ContextType } from '@src/api';
import { Document } from '@src/types';

const DocumentsModel = {
  getAllDocuments: async ({ dataSources: { Documents } }: ContextType) => {
    const results = await Documents.all();

    return (results as unknown) as Document[];
  },

  getDocumentsForOrganization: async (
    { dataSources: { Documents } }: ContextType,
    orgId: string
  ) => {
    const results = await Documents.byOrganizationId(orgId);

    return (results as unknown) as Document[];
  },
};

export { DocumentsModel };
