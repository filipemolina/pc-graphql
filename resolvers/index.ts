import { DocumentResolvers } from './Document';
import { OrganizationResolvers } from './Organization';
import { QueryResolvers } from './Query';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  ...DocumentResolvers,
  ...OrganizationResolvers,
  ...QueryResolvers,
};

export { resolvers };
