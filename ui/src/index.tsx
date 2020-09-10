import React from "react";
import ReactDOM from "react-dom";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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

const fontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily,
      },
    },
  },
  palette: {
    primary: {
      main: "#1167b1",
    },
    secondary: {
      main: "#03254c",
    },
  },
  typography: {
    fontFamily,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
