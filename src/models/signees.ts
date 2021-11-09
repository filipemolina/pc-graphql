import { ContextType } from '@src/api';
import { Signee } from '@src/types';

const SigneesModel = {
  getSigneeById: async (
    { dataSources: { Signees } }: ContextType,
    id: string
  ) => {
    const result = await Signees.byId(id);

    return (result as unknown) as Signee;
  },
};

export { SigneesModel };
