import { GraphQLClient } from "graphql-request";

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY, REACT_APP_GRAPH_CMS_TOKEN_KEY } =
  process.env;

const authorizationKey = `Bearer ${REACT_APP_GRAPH_CMS_TOKEN_KEY}`;
const graphCMS = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
  headers: {
    authorization: authorizationKey
  }
});

export function graphCMSRequest(query, variables) {
  return graphCMS.request(query, variables);
}