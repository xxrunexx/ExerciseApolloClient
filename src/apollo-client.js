import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
uri: 'https://kampus-merdeka.hasura.app/v1/graphql',
headers: {
  'x-hasura-admin-secret': 
  'r0r9cMx2jXIpDaJ2BA4dAF1C5E5GY4MiPuFcP5k3zI4B8LmsbHCwJwnjxhOaM7yQ',
}
});

const wsLink = new WebSocketLink({
  uri: 'wss://kampus-merdeka.hasura.app/v1/graphql',
  options: {
      reconnect: true,
      connectionParams: {
          headers: {
              'x-hasura-admin-secret': 
              'r0r9cMx2jXIpDaJ2BA4dAF1C5E5GY4MiPuFcP5k3zI4B8LmsbHCwJwnjxhOaM7yQ',
          }
      }
  },
  
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
},
wsLink,
httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;