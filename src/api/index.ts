import { DocumentsApi } from './documents';
import { OrganizationsApi } from './organizations';
import { DocumentVersionsApi } from './documentVersions';
import { databaseConfig } from '../db';
import { QuestionsApi } from './questions';
import { AttachmentsApi } from './attachments';

const dataSources = () => ({
  Documents: new DocumentsApi(databaseConfig),
  Organizations: new OrganizationsApi(databaseConfig),
  DocumentVersions: new DocumentVersionsApi(databaseConfig),
  Questions: new QuestionsApi(databaseConfig),
  Attachments: new AttachmentsApi(databaseConfig),
});

type ContextType = {
  dataSources: ReturnType<typeof dataSources>;
};

export { dataSources, ContextType };
