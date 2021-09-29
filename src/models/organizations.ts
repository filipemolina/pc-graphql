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

  getParentOrganization: async (
    { dataSources: { Organizations } }: ContextType,
    parentId?: string | null
  ) => {
    const result = parentId ? await Organizations.byId(parentId) : null;

    return result || null;
  },
};

export { OrganizationsModel };
