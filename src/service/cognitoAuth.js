import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import ToastComponent from "../components/basic/ToastComponent";
import uuid from "react-uuid";

const { REACT_APP_COGNITO_USER_POOLS_ID, REACT_APP_COGNITO_CLIENT_ID } =
  process.env;

const poolData = {
  UserPoolId: REACT_APP_COGNITO_USER_POOLS_ID,
  ClientId: REACT_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

// Create a new user in AWS Cognito.
export async function EmailCreation(values, state) {
  const attributes = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: values.email,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "given_name",
      Value: uuid(),
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "family_name",
      Value: uuid(),
    }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(uuid(), "Azerty123()", attributes, null, (err, result) => {
      if (err) {
        ToastComponent(err.message, "error", 10000);
        reject(err);
        return;
      }

      const cognitoUser = result.user;
      state.updateEmail(values.email);
      console.log("User", cognitoUser);
      resolve(true);
    });
  });
}
