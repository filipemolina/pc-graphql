import { ContextType } from '@src/api';
import { DocumentsModel } from '@src/models';
import { ApiOrganization } from '../types';

const OrganizationResolvers = {
  Organization: {
    Documents: (parentOrg: ApiOrganization, _args: {}, context: ContextType) =>
      DocumentsModel.getDocumentsForOrganization(context, parentOrg.Id),
  },
};

export { OrganizationResolvers };
