import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import UserAccountMenu from "./UserAccountMenu";
import { useStore as userStore } from "../../models/userStore";


const Authentication = () => {
  const { t } = useTranslation();


  const isAuthenticated = userStore((state) => state.isAuthenticated);

  const logOut = userStore((state) => state.logOut);
  const navigate = useNavigate();

  // Sign out first, then we force the redirection to the authentication page.
  function handleLogOut() {

    logOut().then(() => {

      navigate("/login", { replace: true });

    });

  }

  // User is connected, we give him the menu
  if (isAuthenticated) {
    return (
      <Box align="right">
        <UserAccountMenu logOut={handleLogOut} />
      </Box>
    );
  } else {
    return (
      <Box align="right">
        <Button onClick={() => navigate("/login", { replace: true })} variant="outline">
          {t("mapping.navigation.bar.login")}
        </Button>
      </Box>
    );
  }
};

export default Authentication;
