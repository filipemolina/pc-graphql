import { mock_data } from '../mock_data';
import { Resolvers } from '../types';
import { getDocumentsByOrganizationId, getOrganizationById, getQuestionsById } from '../utils';

const QueryResolvers: Resolvers = {
  Query: {
    organizations: () => {
      const { organizations, documents } = mock_data;

      return organizations.map((organization) => ({
        ...organization,
        documentIds: undefined,
        documents: getDocumentsByOrganizationId(documents, organization.id),
        __typename: 'Organization',
      }));
    },
    documents: (_parent, { organizationId }) => {
      const { documents, organizations, questions } = mock_data;

      return documents
        .filter((apiDocument) => apiDocument.organizationId === organizationId)
        .map((apiDocument) => ({
          ...apiDocument,
          organizationId: undefined,
          attendeeQuestionIds: undefined,
          signeeQuestionIds: undefined,
          organization: getOrganizationById(organizations, apiDocument.organizationId),
          attendeeQuestions: getQuestionsById(questions, apiDocument.attendeeQuestionIds),
          signeeQuestions: getQuestionsById(questions, apiDocument.signeeQuestionIds),
          __typename: 'Document',
        }));
    },
  },
};

export { QueryResolvers };
