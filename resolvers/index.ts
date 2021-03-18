import { DocumentResolvers } from './Document';
import { OrganizationResolvers } from './Organization';
import { QueryResolvers } from './Query';

const resolvers = {
  ...DocumentResolvers,
  ...OrganizationResolvers,
  ...QueryResolvers,
};

export { resolvers };
