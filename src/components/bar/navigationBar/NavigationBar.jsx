import React from "react";

import {
  Box,
  Circle,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { HomeAlt } from "@styled-icons/boxicons-regular";
import { Grid, SortDownAlt } from "@styled-icons/bootstrap";

import ButtonComponent from "../../basic/buttons/ButtonComponent";
import Authentication from "../../authentication/Authentication";
import IconButtonComponent from "../../basic/buttons/IconButtonComponent";
import {
  blackColor,
  blueColor,
  borderThickness,
  defaultFontFamily,
  defaultFontSize,
  defaultPadding,
  greyColor,
  mediumPadding,
  smallPadding,
  titleFontSize,
} from "../../../helper/constant";

const DividerLine = styled.div`
  background-color: #000000;
  height: 40px;
  width: 1px;
`;

function MyDivider() {
  return (
    <Box paddingX={smallPadding}>
      <DividerLine />
    </Box>
  );
}

const BlueHome = styled(HomeAlt)`
  color: ${blueColor};
`;

function NavigationBar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <HStack
        height="75px"
        justify="space-between"
        paddingX={defaultPadding}
        shadow="base"
      >
        <HStack>
          <Circle
            border={borderThickness}
            borderColor={blueColor}
            padding="4px"
          >
            <BlueHome size="22.5" title="Home" />
          </Circle>
          <MyDivider />
          <Text fontSize={titleFontSize}>{props.title}</Text>
        </HStack>
        <HStack>
          {/* Display for the map dashboard (button sort, view and search input) */}
          {props.isMapDashboard && (
            <HStack>
              {/* Button View */}
              <ButtonComponent
                isWithoutBorder={true}
                buttonText={t("mapping.navigation.bar.view.button")}
                icon={
                  <Grid
                    size="20"
                    title={t("mapping.navigation.bar.view.button")}
                  />
                }
                color={blackColor}
                onClick={props.onViewclick}
              />
              {/*Button sort*/}
              <ButtonComponent
                padding={`0 ${mediumPadding} 0 ${mediumPadding}`}
                isWithoutBorder={true}
                buttonText={t("mapping.navigation.bar.sort.button")}
                icon={
                  <SortDownAlt
                    size="20"
                    title={t("mapping.navigation.bar.sort.button")}
                  />
                }
                color={blackColor}
                onClick={props.onViewclick}
              />
              {/* Button search */}
              {!isOpen && (
                <IconButtonComponent
                  icon={
                    <SearchIcon
                      color={isOpen ? blueColor : greyColor}
                      w="15px"
                      h="15px"
                    />
                  }
                  onClick={onOpen}
                />
              )}
              {isOpen && (
                <InputGroup w="200px">
                  <InputLeftElement
                    cursor="pointer"
                    onClick={props.handleSearch}
                  >
                    <SearchIcon color={isOpen ? blueColor : greyColor} />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder={t("mapping.navigation.bar.search.placeholder")}
                    border={borderThickness}
                    borderColor={blueColor}
                    _hover={{ borderColor: blueColor }}
                  />
                  <InputRightElement cursor="pointer" onClick={onClose}>
                    <CloseIcon color={greyColor} />
                  </InputRightElement>
                </InputGroup>
              )}
            </HStack>
          )}
          {/* Button located to the left side of the primary button (filter for the canvas page */}
          {props.additionalButtons}
          {/* Primary button */}
          {props.button}
          <MyDivider />
          <Authentication />
        </HStack>
      </HStack>
    </React.Fragment>
  );
}

export default NavigationBar;

//TODO check to put it elsewhere
Text.defaultProps = {
  fontFamily: defaultFontFamily,
  fontSize: defaultFontSize,
};
