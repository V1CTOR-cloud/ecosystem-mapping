import { ColorModeScript } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";

const httpLink = new HttpLink({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master",
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
