import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';
import { DocumentVersionResolvers } from './DocumentVersion';
import { FieldTypeResolvers } from './customTypes/FieldType';
import { CountryCodeResolver } from './customTypes/CountryCode';
import { DocumentResolvers } from './Document';
import { AttachmentResolvers } from './Attachment';

const resolvers = {
  // Enums
  ...FieldTypeResolvers,
  ...CountryCodeResolver,

  // Field Resolvers
  ...OrganizationResolvers,
  ...DocumentResolvers,
  ...DocumentVersionResolvers,
  ...AttachmentResolvers,

  // Queries and Mutations
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
