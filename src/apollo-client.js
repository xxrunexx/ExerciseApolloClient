import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://kampus-merdeka.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
      'x-hasura-admin-secret': 'r0r9cMx2jXIpDaJ2BA4dAF1C5E5GY4MiPuFcP5k3zI4B8LmsbHCwJwnjxhOaM7yQ',
  }
});

export default client;