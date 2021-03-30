import { QueryResolvers } from './Query';
import { Resolvers } from '@src/types';
import { MutationResolvers } from './Mutation';

const resolvers: Resolvers = {
  ...QueryResolvers,
  ...MutationResolvers,
};

export { resolvers };
