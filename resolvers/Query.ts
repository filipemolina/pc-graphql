import { mock_data } from '../mock_data';

const QueryResolvers = {
  Query: {
    organizations: () => mock_data.organizations,
    documents: (parent, { organizationId }, context, info) =>
      mock_data.documents.filter((document) => document.organizationId === organizationId),
  },
};

export { QueryResolvers };
