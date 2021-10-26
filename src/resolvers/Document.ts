import { ContextType } from '@src/api';
import { OrganizationsModel } from '@src/models';
import { Resolvers } from '@src/types';

const DocumentResolvers: Resolvers<ContextType> = {
  Document: {
    Organization: (parent, _args, context) =>
      OrganizationsModel.getOrganizationById(context, parent.Organization_Id),
  },
};
export { DocumentResolvers };
