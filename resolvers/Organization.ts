import { mock_data } from '../mock_data';

const OrganizationResolvers = {
  Organization: {
    documents: (parent) =>
      mock_data.documents.filter((document) => document.organizationId === parent.id),
  },
};

export { OrganizationResolvers };
