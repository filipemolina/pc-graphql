import { mock_data } from '../mock_data';
import { Resolvers } from '../types';

const QueryResolvers: Resolvers = {
  Query: {
    organizations: () => mock_data.organizations,
    documents: (_parent, { organizationId }) =>
      mock_data.documents.filter((document) => document.organizationId === organizationId),
  },
};

export { QueryResolvers };
