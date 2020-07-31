import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
// import Connection from "./Connection";

import { WebSocketLink } from "apollo-link-ws";
// import {ApolloClient } from "apollo-client";

/* import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
const client =   new ApolloClient<NormalizedCacheObject>({
    cache : new InMemoryCache(),
    link : new WebSocketLink({
        uri : "wss://ionic-react-app.herokuapp.com/v1/graphql",
        options:{
            reconnect:true
        }
    })
})
 
ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 */
import { onError } from "apollo-link-error";

/* const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
}); */
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
const client = new ApolloClient<NormalizedCacheObject>({
   cache: new InMemoryCache(),
  // link: new HttpLink({
    uri: "https://ionic-react-app.herokuapp.com/v1/graphql",
  // }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
