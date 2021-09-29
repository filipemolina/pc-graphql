// import { mock_data } from '@src/mock_data';
import { ApiQuestion } from '@src/types';

describe('The util function tests for GraphQL server', () => {
  // const { questions, documents, organizations } = mock_data;

  describe('The getQuestionsById function', () => {
    it("Should return the correct questions when valid ID's are passed", () => {
      // const result = getQuestionsById(questions, ['1', '3']);
      // const expected = [questions[0], questions[2]];
      // expect(result).toEqual(expected);
    });

    it("Should return an empty array if invalid ID's are passed", () => {
      // const result = getQuestionsById(questions, ['55', '99']);
      // const expected = [] as ApiQuestion[];
      // expect(result).toEqual(expected);
    });
  });

  describe('The getOrganizationById function', () => {
    it('Should return a valid Organization if a valid ID is passed', () => {
      // const result = getOrganizationById(organizations, '1');
      // const expected = organizations[0];
      // expect(result).toEqual(expected);
    });

    it('Should return undefined if an invalid ID is passed', () => {
      // const result = getOrganizationById(organizations, '789');
      // expect(result).toBeUndefined();
    });
  });

  describe('The getDocumentsByOrganizationId function', () => {
    it('Should return an array of documents if a valid organization ID is passed', () => {
      // const result = getDocumentsByOrganizationId(documents, '1');
      // const expected = documents.filter(
      //   (document) => document.organizationId === '1'
      // );
      // expect(result).toEqual(expected);
    });
  });
});
