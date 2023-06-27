import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://generative-paw.mightypaw.info/graphql',
  cache: new InMemoryCache()
});

export default client;