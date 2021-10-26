import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';
import { DocumentVersionResolvers } from './DocumentVersion';
import { FieldTypeResolvers } from './customTypes/FieldType';
import { CountryCodeResolver } from './customTypes/CountryCode';
import { DocumentResolvers } from './Document';

const resolvers = {
  // Enums
  ...FieldTypeResolvers,
  ...CountryCodeResolver,

  // Field Resolvers
  ...OrganizationResolvers,
  ...DocumentResolvers,
  ...DocumentVersionResolvers,

  // Queries and Mutations
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
