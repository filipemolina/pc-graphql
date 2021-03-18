import { ApiDocument, ApiOrganization, ApiQuestion } from '../types';

const getDocumentsByOrganizationId = (
  documents: ApiDocument[],
  organizationId: string
) =>
  documents.filter(
    (apiDocument) => apiDocument.organizationId === organizationId
  );

const getOrganizationById = (
  organizations: ApiOrganization[],
  organizationId: string
) => {
  const organization = organizations.find(
    (apiOrganization) => apiOrganization.id === organizationId
  );

  return organization || organizations[0];
};

const getQuestionsById = (questions: ApiQuestion[], questionIds: string[]) =>
  questionIds.flatMap((questionId) =>
    questions.filter((question) => question.id === questionId)
  );

export { getDocumentsByOrganizationId, getOrganizationById, getQuestionsById };
