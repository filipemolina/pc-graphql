import { ContextType } from '@src/api';
import { Attachment } from '@src/types';

const AttachmentsModel = {
  getAttachmentsByDocumentVersionId: async (
    { dataSources: { Attachments } }: ContextType,
    id: string
  ) => {
    const results = Attachments.byDocumentId(id);

    return (results as unknown) as Attachment[];
  },
};

export { AttachmentsModel };
