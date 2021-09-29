import { ContextType } from '@src/api';
import { DocumentsModel, OrganizationsModel } from '@src/models';
import { Resolvers } from '../types';

const QueryResolvers: Resolvers<ContextType> = {
  Query: {
    Organization: (_parent, { organizationId }, context) =>
      OrganizationsModel.getOrganizationById(context, organizationId),
    Documents: (_parent, { organizationId }, context) =>
      DocumentsModel.getDocumentsForOrganization(context, organizationId),
  },
};

export { QueryResolvers };
