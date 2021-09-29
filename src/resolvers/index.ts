import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';

const resolvers = {
  ...OrganizationResolvers,
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
