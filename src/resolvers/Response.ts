import { ContextType } from '@src/api';
import { OrganizationsModel, SigneesModel } from '@src/models';
import { Resolvers } from '@src/types';

const ResponseResolvers: Resolvers<ContextType> = {
  Response: {
    Signee: (parent, _args, context) =>
      SigneesModel.getSigneeById(context, parent.Signee_Id),

    Organization: (parent, _args, context) =>
      OrganizationsModel.getOrganizationById(context, parent.Organization_Id),
  },
};

export { ResponseResolvers };
