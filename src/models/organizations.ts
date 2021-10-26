import { ContextType } from '@src/api';
import { Organization } from '@src/types';

const OrganizationsModel = {
  getOrganizationById: async (
    { dataSources: { Organizations } }: ContextType,
    orgId?: string | null
  ) => {
    const result = orgId ? await Organizations.byId(orgId) : null;

    return ((result as unknown) as Organization) || null;
  },

  getOrganizationByDocumentVersionId: (
    { dataSources: { Organizations } }: ContextType,
    documentVersionId: string
  ) => {},
};

export { OrganizationsModel };
