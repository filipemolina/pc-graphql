import { ContextType } from '@src/api';
import { Response } from '@src/types';

const ResponsesModel = {
  getAllResponses: async ({ dataSources: { Responses } }: ContextType) => {
    const result = await Responses.all();

    return (result as unknown) as Response[];
  },

  getResponseById: async (
    { dataSources: { Responses } }: ContextType,
    id: string
  ) => {
    const result = await Responses.byId(id);

    return (result as unknown) as Response;
  },
};

export { ResponsesModel };
