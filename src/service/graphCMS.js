import { GraphQLClient } from "graphql-request";

import config from "../config";



const authorizationKey = `Bearer ${config.graphCMS.TOKEN_KEY}`;
const graphCMS = new GraphQLClient(config.graphCMS.CONTENT_API_KEY, {
  headers: {
    authorization: authorizationKey
  }
});
//console.log("GRAPH_CMS ",authorizationKey);

export function graphCMSRequest(query, variables) {
  return graphCMS.request(query, variables);
}