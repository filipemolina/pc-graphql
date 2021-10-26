import { ContextType } from '@src/api';
import {
  DocumentsModel,
  DocumentVersionsModel,
  OrganizationsModel,
} from '@src/models';
import { Resolvers } from '../types';

const QueryResolvers: Resolvers<ContextType> = {
  Query: {
    Organization: (_parent, { organizationId }, context) =>
      OrganizationsModel.getOrganizationById(context, organizationId),

    Documents: (_parent, { organizationId }, context) =>
      DocumentsModel.getDocumentsForOrganization(context, organizationId),

    DocumentVersion: (_parent, { docVersionId }, context) =>
      DocumentVersionsModel.getDocumentVersionById(context, docVersionId),

    Form: (_parent, { hashedId }, context) =>
      DocumentVersionsModel.getDocumentVersionByHashedId(context, hashedId),
  },
};

export { QueryResolvers };
