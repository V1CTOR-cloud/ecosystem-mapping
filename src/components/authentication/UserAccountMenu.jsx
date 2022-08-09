import React from "react";

import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../../assets/images/Logo.png";

const LogMenuList = chakra(MenuList, {
  baseStyle: {
    width: "320px",
    marginTop: "20px",
    boxShadow: "0px 20px 40px -2px rgba(34, 44, 47, 0.15) !important",
    borderRadius: "4px !important",
    fontSize: "16px",
    letterSpacing: "0.02em",
  },
});

const UserAccountMenu = (props) => {
  const { user, logOut } = props;
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={Button}
        padding="0px"
        backgroundColor="transparent"
        border="none"
        boxShadow="none"
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        _focus={{
          boxShadow: "none",
          border: "none",
        }}
      >
        <HStack>
          <Image borderRadius="50%" width="40px" src={logo} alt="image" />
        </HStack>
      </MenuButton>
      <LogMenuList>
        <Flex mt="15px">
          <Image
            ml="20px"
            borderRadius="50%"
            width="50px"
            src={user.profileImage.url}
            alt="image"
          />
          <Text m="auto" ml="15px">
            {user.firstName + " " + user.lastName}
          </Text>
        </Flex>
        <Box p="15px">
          <MenuItem>
            <NavLink to="/dashboard">
              {t("mapping.navigation.bar.login.dashboard")}
            </NavLink>
          </MenuItem>
          <MenuItem onClick={logOut}>
            {t("mapping.navigation.bar.user.logout")}
          </MenuItem>
        </Box>
      </LogMenuList>
    </Menu>
  );
};

UserAccountMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default UserAccountMenu;
