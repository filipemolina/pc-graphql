import { ContextType } from '@src/api';
import { QuestionModel } from '@src/models/questions';
import { Resolvers } from '@src/types';

const TicketResolvers: Resolvers<ContextType> = {
  Ticket: {
    FormQuestions: (parent, _args, context) =>
      QuestionModel.getQuestionsById(context, parent.FormQuestions_Id),
  },
};

export { TicketResolvers };
