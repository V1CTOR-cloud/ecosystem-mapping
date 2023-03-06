import React from "react";

import createContext from "zustand/context";
import create from "zustand";

import PropTypes from "prop-types";
import uuid from "react-uuid";

import ToastComponent from "../components/basic/ToastComponent";

import {  Auth } from "aws-amplify";

import config from "../config";

export const { Provider, useStore } = createContext();



let AUTHConfig = {
  // To get the aws credentials, you need to configure
  // the Auth module with your Cognito Federated Identity Pool
  mandatorySignIn: false,
  userPoolId: config.cognito.USER_POOL_ID,
  identityPoolId: config.cognito.IDENTITY_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  region: config.auth_region,
  identityPoolRegion: config.main_region,
};
Auth.configure(AUTHConfig);

let password = "";

// Provider that will contain all the information of the user, in addition of all the function to update it.
export const UserProvider = ({ children }) => {
  const initUser={
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: ""
  }
  return (
    <Provider
      createStore={() =>
        create((set, get) => ({
              user:initUser,
              //isLoggedIn: false,

             isAuthenticated:false,

             setIsAuthenticated:(bool) =>
             set({ isAuthenticated: bool }),

             isLoggedIn: async() => {
              try {
              const currentSession = await Auth.currentSession();

              console.log("APP AUTH ", currentSession, Auth._config);
             
              if (currentSession) {
                console.log("SESSION OK")
                const token = currentSession.getIdToken().payload;
                console.log("TOKEN ",token);
                const currentUser = {
                  id: token["cognito:username"],
                  email:token['email'],
                  firstName:token['given_name'],
                  lastName:token['family_name'],
                  username:token['preferred_username']
                };
                set({ isAuthenticated: true,user:currentUser });
                return Promise.resolve(true);
              } else {
                console.log("SESSION ERROR");
                return Promise.resolve(false);
              }
            
            } catch (e) {
              if (typeof e === "string" && e === "No current user") {
                console.log("SESSION EXPIRED OR NOT FOUND...");
                return Promise.resolve(false);
              }  
              console.log("ERROR ...",e);
              return Promise.resolve(false);
            }
             
            
             },
              

              /**
               * Log out the user and clear the user properties.
               * @return {Promise<void>} - Void is successful, otherwise a toast is displayed.
               */
              logOut: async () => {
                try {
                  await Auth.signOut();
                  // Set the user properties to default values (empty).
                  //set({ schema: currentSchema });
                  set({ isAuthenticated:false,user: initUser });
                  /*
                  set((state) => ({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    //isLoggedIn: false,
                  }));
                  */
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
                    username: uuid(),
                    password: values.password,
                    attributes: {
                      email: values.email,
                      family_name: "",
                      given_name: "",
                    },
                  };
                  password = values.password;

                  const res = await Auth.signUp(attributes);

                  console.log("SIGN UP ",res);
                  set((state) => ({user:{...state.user,
                    id: res.user.username,
                    email: values.email,
                    username: values.username,
                    }}));
                  
                    
                  /*
                  // Set the user properties to new ones.
                  set((state) => ({
                    id: res.userSub,
                    email: values.email,
                    username: values.username,
                  }));
                  */

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
              signIn: async (values, isRegistration=false) => {
                console.log("SIGN IN VALUES ",values);

                try {
                  const res = await Auth.signIn(
                    isRegistration?get().user.id:values.username,
                    isRegistration ? password:values.password 
                  );
                  console.log("SIGN IN ",res);  
                  password = "";
                  let user={
                    id: res.username,
                    firstName: res.attributes.given_name,
                    lastName: res.attributes.family_name,
                    email: res.attributes.email,
                    username: isRegistration?get().user.username:res.attributes.preferred_username,
                  }
                  if (!isRegistration) {
                    user.isAuthenticated=true
                  }

                  set({ user: user });
                  console.log("SIGN IN OK",user);
                  /*  
                  set((state) => ({
                    id: res.attributes.sub,
                    firstName: res.attributes.given_name,
                    lastName: res.attributes.family_name,
                    email: res.attributes.email,
                    username: res.username,
                    //isLoggedIn: !isRegistration,
                  }));
                  */

                  return Promise.resolve(true);
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
                console.log("VERIFY ",get().user);
                try {
                  await Auth.confirmSignUp(get().user.id, values.code);
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
                console.log("UPDATE ",values,get().user);
                try {
                  const user = await Auth.currentAuthenticatedUser();
                  const attributes = {
                    family_name: values.lastName,
                    given_name: values.firstName,
                    preferred_username:get().user.username,
                  };

                  await Auth.updateUserAttributes(user, attributes);


                  set((state) => ({user:{...state.user,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    }}));
                    /*
                  set((state) => ({
                    firstName: values.firstName,
                    lastName: values.lastName,
                  }));
*/
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


                  set((state) => ({user:{...state.user,
                    username: values.username,
                    }}));
                    /*
                  set((state) => ({
                    username: values.username,
                  }));
                  */
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