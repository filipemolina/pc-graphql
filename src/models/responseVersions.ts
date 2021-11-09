import { ContextType } from '@src/api';
import { ResponseVersion } from '@src/types';

const ResponseVersionsModel = {
  getResponseVersionsByFormId: async (
    { dataSources: { ResponseVersions } }: ContextType,
    formId: string
  ) => {
    const result = await ResponseVersions.byFormId(formId);

    return (result as unknown) as ResponseVersion[];
  },
};

export { ResponseVersionsModel };
