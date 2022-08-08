import { Auth } from "aws-amplify";
import uuid from "react-uuid";

import ToastComponent from "../components/basic/ToastComponent";

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
  const attributes = {
    username: values.username,
    password: values.password,
    attributes: {
      email: values.email,
      family_name: uuid(),
      given_name: uuid(),
    },
  };

  password = values.password;

  return new Promise((resolve, reject) => {
    Auth.signUp(attributes)
      .then(() => {
        updateEmail(values.email);
        updateUsername(values.username);
        resolve(true);
      })
      .catch((err) => {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      });
  });
}

/**
 * Verify the code sent to the user by email and set the account to confirmed in Cognito if correct.
 * @param values - The form values from the formik component, here only the code.
 * @param username - The username of the user.
 * @return {Promise<Boolean>} - True if the code is correct, otherwise a toast is displayed.
 */
export function emailCodeVerification(values, username) {
  return new Promise((resolve, reject) => {
    Auth.confirmSignUp(username, values.code)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      });
  });
}

/**
 * Update the family name and given name of the user.
 * @param values The form values from the formik component (firstName and lastName).
 * @param updateFirstName - Function to update the first name of the user with zustand.
 * @param updateLastName - Function to update the last name of the user with zustand.
 * @return {Promise<unknown>} - True if the user was updated, otherwise a toast is displayed.
 */
export async function updateUserInfo(values, updateFirstName, updateLastName) {
  const user = await Auth.currentAuthenticatedUser().catch((err) =>
    ToastComponent(err.message, "error", 10000)
  );

  const attributes = {
    family_name: values.lastName,
    given_name: values.firstName,
  };

  return new Promise((resolve, reject) => {
    Auth.updateUserAttributes(user, attributes)
      .then(() => {
        updateFirstName(values.firstName);
        updateLastName(values.lastName);
        resolve(true);
      })
      .catch((err) => {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      });
  });
}

/**
 * Sign in the user with the username and password.
 * @param values The form values from the formik component (username and password).
 * @param updateIsLoggedIn - Function to update the isLoggedIn property with zustand.
 * @return {Promise<unknown>} - True if the user was signed in, otherwise a toast is displayed.
 */
export function signIn(values, updateIsLoggedIn) {
  return new Promise((resolve, reject) => {
    Auth.signIn(values.username, values.password ? values.password : password)
      .then((res) => {
        updateIsLoggedIn(true);
        password = "";
        resolve({ value: true, user: res });
      })
      .catch((err) => {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      });
  });
}

/**
 * Sign out the user.
 * @param updateIsLoggedIn - Function to update the isLoggedIn property with zustand.
 * @return {Promise<unknown>} - True if the user was signed out, otherwise a toast is displayed.
 */
export function signOut(updateIsLoggedIn) {
  return new Promise((resolve, reject) => {
    Auth.signOut()
      .then(() => {
        updateIsLoggedIn(false);
        resolve(true);
      })
      .catch((err) => {
        ToastComponent(err.message, "error", 10000);
        reject(err);
      });
  });
}
