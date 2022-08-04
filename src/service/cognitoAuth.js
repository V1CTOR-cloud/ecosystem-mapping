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
let cognitoUser;

// Create a new user in AWS Cognito.
// Create dummy data for first name, last name, username and password for later update them.
/**
 * Create a new user in AWS Cognito.
 * Create dummy data for first name, last name, username and password for later update them.
 * @param values {Object} - The form values from the formik component, here only the email.
 * @param state - The Zustand state of the userStore.
 * @return {Promise<Boolean>} - True if the user was created, otherwise a toast is displayed.
 */
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

      cognitoUser = result.user;
      state.updateEmail(values.email);
      resolve(true);
    });
  });
}

/**
 * Verify the code sent to the user by email and set the account to confirmed in Cognito if correct.
 * @param values - The form values from the formik component, here only the code.
 * @return {Promise<Boolean>} - True if the code is correct, otherwise a toast is displayed.
 */
export function EmailCodeVerification(values) {
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(values.code, true, (err) => {
      if (err) {
        ToastComponent(err.message, "error", 10000);
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}
