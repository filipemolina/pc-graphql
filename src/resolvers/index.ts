import { QueryResolvers } from './Query';
import { MutationResolvers } from './Mutation';
import { OrganizationResolvers } from './Organization';
import { DocumentVersionResolvers } from './DocumentVersion';
import { FieldTypeResolvers } from './customTypes/FieldType';
import { CountryCodeResolver } from './customTypes/CountryCode';
import { DocumentResolvers } from './Document';
import { AttachmentResolvers } from './Attachment';
import { TicketResolvers } from './Ticket';
import { ResponseResolvers } from './Response';

const resolvers = {
  // Enums
  ...FieldTypeResolvers,
  ...CountryCodeResolver,

  // Field Resolvers
  ...OrganizationResolvers,
  ...DocumentResolvers,
  ...DocumentVersionResolvers,
  ...AttachmentResolvers,
  ...TicketResolvers,
  ...ResponseResolvers,

  // Queries and Mutations
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
