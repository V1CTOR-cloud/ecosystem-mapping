import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import uuid from "react-uuid";

import ToastComponent from "../components/basic/ToastComponent";

const { REACT_APP_COGNITO_USER_POOLS_ID, REACT_APP_COGNITO_CLIENT_ID } =
  process.env;

const poolData = {
  UserPoolId: REACT_APP_COGNITO_USER_POOLS_ID,
  ClientId: REACT_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);
let cognitoUser;
let password = "";

/**
 * Create a new user in AWS Cognito.
 * Create dummy data for first name, last name, username and password for later update them.
 * @param values {Object} - The form values from the formik component, here only the email.
 * @param updateEmail - The updateEmail Zustand function of the userStore.
 * @param updateUsername - The updateUsername Zustand function of the userStore.
 * @return {Promise<Boolean>} - True if the user was created, otherwise a toast is displayed.
 */
export async function accountCreation(values, updateEmail, updateUsername) {
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

  password = values.password;

  return new Promise((resolve, reject) => {
    userPool.signUp(
      values.username,
      values.password,
      attributes,
      null,
      (err, result) => {
        if (err) {
          ToastComponent(err.message, "error", 10000);
          reject(err);
          return;
        }

        // Update variables in the userStore and cognitoUser also.
        cognitoUser = result.user;
        updateEmail(values.email);
        updateUsername(values.username);
        resolve(true);
      }
    );
  });
}

/**
 * Verify the code sent to the user by email and set the account to confirmed in Cognito if correct.
 * @param values - The form values from the formik component, here only the code.
 * @return {Promise<Boolean>} - True if the code is correct, otherwise a toast is displayed.
 */
export function emailCodeVerification(values) {
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

/**
 * Update the family name and given name of the user.
 * @param values The form values from the formik component (firstName and lastName).
 * @return {Promise<unknown>} - True if the user was updated, otherwise a toast is displayed.
 */
export function updateUserInfo(values) {
  const attributes = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "given_name",
      Value: values.firstName,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "family_name",
      Value: values.lastName,
    }),
  ];

  return new Promise((resolve, reject) => {
    cognitoUser.updateAttributes(attributes, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}

/**
 * Sign in the user with the username and password.
 * @param values The form values from the formik component (username and password).
 * @return {Promise<unknown>} - True if the user was signed in, otherwise a toast is displayed.
 */
export function signIn(values) {
  const authenticationData = {
    Username: values.username,
    Password: values.password ? values.password : password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const userData = {
    Username: values.username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("success", result);
        resolve(true);
      },

      onFailure: function (err) {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      },
    });
  });
}
