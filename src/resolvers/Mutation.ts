import { Resolvers } from '@src/types';
import { v4 as uuidv4 } from 'uuid';

const MutationResolvers: Resolvers = {
  Mutation: {
    createDocument: (parent, { document }) => {
      // Persist logic
      return {
        ...document,
        id: uuidv4(),
        attendeeQuestions: [],
        signeeQuestions: [],
        organization: {
          id: document.organizationId,
          divisionName: 'Example Org',
          documentIds: [],
          name: 'Example Org',
          nameForCommunications: 'Organization Org',
          numberOfStudents: 0,
        },
      };
    },
  },
};

export { MutationResolvers };
