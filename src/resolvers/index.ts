import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';
import { DocumentVersionResolvers } from './DocumentVersion';
import { FieldTypeResolvers } from './customTypes/FieldType';

const resolvers = {
  // Enums
  ...FieldTypeResolvers,

  // Field Resolvers
  ...OrganizationResolvers,
  ...DocumentVersionResolvers,

  // Queries and Mutations
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
