import { ApolloServer } from 'apollo-server';

import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { dataSources } from './api';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
