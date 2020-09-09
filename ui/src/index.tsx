import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
// For GraphQL Auth, see: https://www.apollographql.com/docs/react/networking/authentication/
const httpLink = createHttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-api-key": awsconfig.aws_appsync_apiKey,
  },
}));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
