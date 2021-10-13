import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';
import { DocumentVersionResolvers } from './DocumentVersion';

const resolvers = {
  ...OrganizationResolvers,
  ...DocumentVersionResolvers,

  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
