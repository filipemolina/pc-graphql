import { DocumentsApi } from './documents';
import { OrganizationsApi } from './organizations'

const dataSources = () => ({
  Documents: DocumentsApi,
  Organizations: OrganizationsApi,
});

type ContextType = {
  dataSources: ReturnType<typeof dataSources>
};

export { dataSources, ContextType }