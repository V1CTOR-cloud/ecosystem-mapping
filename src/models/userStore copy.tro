import React from "react";

import createContext from "zustand/context";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import uuid from "react-uuid";

import ToastComponent from "../components/basic/ToastComponent";

export const { Provider, useStore } = createContext();

let password = "";

// Provider that will contain all the information of the user, in addition of all the function to update it.
export const UserProvider = ({ children }) => {
  return (
    <Provider
      createStore={() =>
        create(
          devtools(
            persist((set, get) => ({
              id: "",
              firstName: "",
              lastName: "",
              email: "",
              username: "",
              isLoggedIn: false,

              /**
               * Function to set the isLoggedIn state.
               * @param bool - Boolean value that will be set to the isLoggedIn state.
               */
              updateIsLoggedIn: (bool) =>
                set((state) => ({ isLoggedIn: bool })),

              /**
               * Log out the user and clear the user properties.
               * @return {Promise<void>} - Void is successful, otherwise a toast is displayed.
               */
              logOut: async () => {
                try {
                  await Auth.signOut();
                  // Set the user properties to default values (empty).
                  set((state) => ({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    isLoggedIn: false,
                  }));
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },

              /**
               * Create a new user in AWS Cognito.
               * Create dummy data for first name and last name to update them later.
               * @param values - The form values from the formik component, here only the email.
               * @return {Promise<boolean>} - True if the user was created, otherwise a toast is displayed.
               */
              createAccount: async (values) => {
                try {
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

                  const res = await Auth.signUp(attributes);

                  // Set the user properties to new ones.
                  set((state) => ({
                    id: res.userSub,
                    email: values.email,
                    username: values.username,
                  }));

                  return true;
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },

              /**
               * Log in the user with the username and password.
               * @param values - The form values from the formik component (username and password).
               * @param isRegistration - True if the user is registering, false if the user is logging in.
               * @return {Promise<boolean>} - True if the user was signed in, otherwise a toast is displayed.
               */
              signIn: async (values, isRegistration) => {
                try {
                  const res = await Auth.signIn(
                    values.username,
                    values.password ? values.password : password
                  );

                  password = "";

                  set((state) => ({
                    id: res.attributes.sub,
                    firstName: res.attributes.given_name,
                    lastName: res.attributes.family_name,
                    email: res.attributes.email,
                    username: res.username,
                    isLoggedIn: !isRegistration,
                  }));

                  return true;
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },

              /**
               * Verify the code sent to the user by email and set the account to confirmed in Cognito if correct.
               * @param values - The form values from the formik component, here only the code.
               * @return {Promise<void>} If error a toast is displayed.
               */
              emailCodeVerification: async (values) => {
                try {
                  await Auth.confirmSignUp(get().username, values.code);
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },
              /**
               * Update the family name and given name of the user in AWS Cognito.
               * @param values The form values from the formik component (firstName and lastName).
               * @return {Promise<boolean>} - True if the user was updated, otherwise a toast is displayed.
               */
              updateUserInfo: async (values) => {
                try {
                  const user = await Auth.currentAuthenticatedUser();
                  const attributes = {
                    family_name: values.lastName,
                    given_name: values.firstName,
                  };

                  await Auth.updateUserAttributes(user, attributes);

                  set((state) => ({
                    firstName: values.firstName,
                    lastName: values.lastName,
                  }));

                  return true;
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },

              /**
               * Send code to the user email to verify the identity.
               * @param values - The form values from the formik component, here only the username.
               * @return {Promise<Boolean>} - True if the user was updated, otherwise a toast is displayed.
               */
              forgotPasswordUsernameInformation: async (values) => {
                try {
                  // Send confirmation code to user's email
                  await Auth.forgotPassword(values.username);

                  set((state) => ({
                    username: values.username,
                  }));

                  return true;
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },

              /**
               * Update the password of the user in AWS Cognito.
               * @param values - The form values from the formik component, here only the code and the new password.
               * @return {Promise<boolean>} - True if the user was updated, otherwise a toast is displayed.
               */
              forgotPasswordCodeVerification: async (values) => {
                try {
                  // Verify the code sent to the user by email and set the account to confirmed in Cognito if correct.
                  await Auth.forgotPasswordSubmit(
                    get().username,
                    values.code,
                    values.password
                  );

                  return true;
                } catch (err) {
                  ToastComponent(err.message, "error", 10000);
                }
              },
            }))
          )
        )
      }
    >
      {children}
    </Provider>
  );
};

UserProvider.propTypes = {
  /**
   * The children of the UserProvider.
   */
  children: PropTypes.element.isRequired,
};
