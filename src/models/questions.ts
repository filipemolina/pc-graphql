import { ContextType } from '@src/api';
import { Field } from '@src/types';

const QuestionModel = {
  getQuestionsById: async (
    { dataSources: { Questions } }: ContextType,
    questionId?: string | null
  ) => {
    const result = questionId ? await Questions.byId(questionId) : null;

    const questionsJson = result
      ? (JSON.parse(result.Json) as { fields: Field[] })
      : { fields: [] };


    return questionsJson.fields;
  },
};

export { QuestionModel };
