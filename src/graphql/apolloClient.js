import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create HTTP link to the GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://alkhanka-hospital.org/scandiweb/graphql',
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
