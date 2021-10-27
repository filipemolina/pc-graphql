import { ContextType } from '@src/api';

const PublicOrganizerAnswersModel = {
  getAnswersByDocumentVersionId: async (
    { dataSources: { PublicOrganizerAnswers } }: ContextType,
    documentVersionId: string
  ) => PublicOrganizerAnswers.byDocumentVersionId(documentVersionId),
};

export { PublicOrganizerAnswersModel };
