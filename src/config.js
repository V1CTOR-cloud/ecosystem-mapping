const prod = {
  auth_region: process.env.REACT_APP_COGNITO_REGION,
  main_region: process.env.REACT_APP_COGNITO_REGION,
  graphCMS:{
  CONTENT_API_KEY: process.env.REACT_APP_GRAPH_CMS_CONTENT_API_KEY,
ASSET_API_KEY: process.env.REACT_APP_GRAPH_CMS_ASSET_API_KEY,
TOKEN_KEY: process.env.REACT_APP_GRAPH_CMS_TOKEN_KEY
  },
  cognito: {
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  appSync: {
    aws_appsync_graphqlEndpoint: "",
    aws_appsync_authenticationType: ""
  },
  S3: {
    bucket: "circlepass-data-" + process.env.REACT_APP_ACCOUNT_ID+"-"+ process.env.REACT_APP_COGNITO_REGION,
    region: "eu-west-1",
  },
  AccountId: process.env.REACT_APP_ACCOUNT_ID,
};
/*
const dev = {

};
*/
// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : prod;

export default {
  // Add common config values here
  support: "anybody@anywhere.org",
  ...config,
};
