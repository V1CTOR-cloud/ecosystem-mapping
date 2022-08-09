import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import UserAccountMenu from "./UserAccountMenu";
import { useStore as userStore } from "../../models/userStore";

const Authentication = () => {
  const { t } = useTranslation();
  const logOut = userStore((state) => state.logOut);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  // Sign out first, then we force the redirection to the authentication page.
  const handleLogOut = async () => {
    logOut().then(() => {
      if (isLoggedIn === false) {
        navigate("/authentication");
      }
    });
  };

  // User is connected, we give him the menu
  if (isLoggedIn) {
    return (
      <Box align="right">
        <UserAccountMenu logOut={handleLogOut} />
      </Box>
    );
  } else {
    return (
      <Box align="right">
        <Button onClick={() => navigate("/authentication")} variant="outline">
          {t("mapping.navigation.bar.login")}
        </Button>
      </Box>
    );
  }
};

export default Authentication;
