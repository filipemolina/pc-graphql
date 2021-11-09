import { DocumentsApi } from './documents';
import { OrganizationsApi } from './organizations';
import { DocumentVersionsApi } from './documentVersions';
import { databaseConfig } from '../db';
import { QuestionsApi } from './questions';
import { AttachmentsApi } from './attachments';
import { PublicOrganizerAnswersApi } from './publicOrganizerAnswers';
import { TicketsApi } from './tickets';
import { SigneeApi } from './signees';
import { ResponseVersionApi } from './responseVersions';
import { ResponsesApi } from './responses';

const dataSources = () => ({
  // Database APIS
  Documents: new DocumentsApi(databaseConfig),
  Organizations: new OrganizationsApi(databaseConfig),
  DocumentVersions: new DocumentVersionsApi(databaseConfig),
  Questions: new QuestionsApi(databaseConfig),
  Attachments: new AttachmentsApi(databaseConfig),
  PublicOrganizerAnswers: new PublicOrganizerAnswersApi(databaseConfig),
  Tickets: new TicketsApi(databaseConfig),
  Signees: new SigneeApi(databaseConfig),
  ResponseVersions: new ResponseVersionApi(databaseConfig),
  Responses: new ResponsesApi(databaseConfig),
});

type ContextType = {
  dataSources: ReturnType<typeof dataSources>;
};

export { dataSources, ContextType };
