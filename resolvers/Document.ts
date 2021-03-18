import { mock_data } from '../mock_data';

const DocumentResolvers = {
  Document: {
    organization: (parent) =>
      mock_data.organizations.find((organization) => organization.id === parent.organizationId),
  },
};

export { DocumentResolvers };
