import React, { useEffect, useState } from "react";

import { Box, Button, Center, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Service from "../../service/EcosystemMapServices";
import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports";
import { UserAccountMenu } from "../miscellaneousComponents";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../service/AuthenticationService";
import Logo from "../../assets/images/Logo.png";

Amplify.configure(awsExports);

const Authentication = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState(null);
  let history = useHistory();

  // Trigger only once to check if the user is already connected
  useEffect(() => {
    setUserInfo(getCurrentUser());
  }, []);

  // Sign out first, then we force to close the modal of authentication, and finally we reset the session storage
  const handleLogOut = async () => {
    await Auth.signOut();
    onClose();
    setUserInfo(Service.setSessionStorageUser());
    history.push("/");
  };

  const components = {
    SignIn: {
      Footer() {
        return (
          <Box
            w="100%"
            backgroundColor="#FFFFFF"
            align="center"
            marginBottom={"15px"}
          >
            <Text
              as="ins"
              fontSize="sm"
              cursor="pointer"
              onClick={handleLogOut}
            >
              Back to the page
            </Text>
          </Box>
        );
      },
    },

    SignUp: {
      Footer() {
        return (
          <Box
            w="100%"
            backgroundColor="#FFFFFF"
            align="center"
            marginBottom={"15px"}
          >
            <Text
              as="ins"
              fontSize="sm"
              cursor="pointer"
              onClick={handleLogOut}
            >
              Back to the page
            </Text>
          </Box>
        );
      },
    },
  };

  const formFields = {
    signUp: {
      email: {
        label: "Email",
        placeholder: "Enter your email",
        labelHidden: false,
        isRequired: true,
        order: 1,
      },
      name: {
        label: "Name",
        placeholder: "Enter your name",
        isRequired: true,
        order: 2,
      },
      family_name: {
        label: "Family name",
        placeholder: "Enter your family name",
        isRequired: true,
        order: 3,
      },
      password: {
        label: "Password",
        placeholder: "Enter your Password",
        labelHidden: false,
        isRequired: true,
        order: 4,
      },
      confirm_password: {
        label: "Confirm Password",
        labelHidden: false,
        isRequired: true,
        order: 5,
      },
    },
  };

  // User is connected, we give him the menu
  if (userInfo) {
    return (
      <Box align="right">
        <UserAccountMenu logOut={handleLogOut} user={userInfo} />
      </Box>
    );
  } else {
    return (
      <Box>
        {!isOpen && (
          <Box align="right">
            <Button onClick={onOpen} variant="outline">
              <Center>
                <Text>{t("startup.landing.page.login")}</Text>
              </Center>
            </Button>
          </Box>
        )}
        {isOpen && (
          <Authenticator
            variation="modal"
            loginMechanisms={["email"]}
            formFields={formFields}
            components={components}
          >
            {({ user }) => {
              Service.authenticationUser(user.attributes)
                .then((res) => {
                  if (!res.profileImage.url) {
                    res.profileImage = {
                      url: Logo,
                    };
                  }
                  setUserInfo(res);
                })
                .catch((error) => error);

              return null;
            }}
          </Authenticator>
        )}
      </Box>
    );
  }
};

export default Authentication;
