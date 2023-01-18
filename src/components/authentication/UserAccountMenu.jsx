import React, { useRef } from "react";

import {
  Box,
  Button,
  chakra,
  Circle,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// import logo from "../../assets/images/Logo.png";
import { useStore as userStore } from "../../models/userStore";

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
  const { logOut } = props;
  const { t } = useTranslation();
  const user = userStore((state) => state.user);
  //const firstName = userStore((state) => state.firstName);
  //const lastName = userStore((state) => state.lastName);
  let backgroundColor = useRef(getRandomColor());
  //const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  let initials = "";
  if (user.firstName !== "" && user.lastName !== "") {
    initials = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
  }

  function getRandomColor() {
    const colorList = [
      "#3E442B",
      "#2176ff",
      "#31393C",
      "#B08EA2",
      "#6D435A",
      "#352D39",
      "#FF6978",
      "#419D78",
      "#679436",
      "#FE654F",
      "#A23E48",
    ];

    return colorList[Math.floor(Math.random() * colorList.length)];
  }

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
          {/* Change and put the user picture if he has one*/}
          {/*<Image borderRadius="50%" width="40px" src={logo} alt="image" />*/}
          <Circle size="45px" bg={backgroundColor.current}>
            <Text fontWeight="bold" fontSize="md">
              {initials}
            </Text>
          </Circle>
        </HStack>
      </MenuButton>
      <LogMenuList>
        <Flex mt="15px">
          {/*<Image
            ml="20px"
            borderRadius="50%"
            width="50px"
            src={logo}
            alt="image"
          />*/}
          <Circle ml={7} size="45px" bg={backgroundColor.current}>
            <Text fontWeight="bold" fontSize="md" color="white">
              {initials}
            </Text>
          </Circle>
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
  /**
   * Function to log out the user.
   */
  logOut: PropTypes.func.isRequired,
};

export default UserAccountMenu;
