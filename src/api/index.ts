import { DocumentsApi } from './documents';
import { OrganizationsApi } from './organizations';
import { DocumentVersionsApi } from './documentVersions';
import { databaseConfig } from '../db';

const dataSources = () => ({
  Documents: new DocumentsApi(databaseConfig),
  Organizations: new OrganizationsApi(databaseConfig),
  DocumentVersions: new DocumentVersionsApi(databaseConfig),
});

type ContextType = {
  dataSources: ReturnType<typeof dataSources>;
};

export { dataSources, ContextType };
