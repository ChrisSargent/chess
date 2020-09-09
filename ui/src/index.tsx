import React from "react";
import ReactDOM from "react-dom";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import appSyncConfig from "./aws-exports";

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth = {
  apiKey: appSyncConfig.aws_appsync_apiKey,
  type: appSyncConfig.aws_appsync_authenticationType,
};

const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
  // @ts-ignore
  createAuthLink({ auth, region, url }),
  // @ts-ignore
  createSubscriptionHandshakeLink(url, httpLink),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
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
