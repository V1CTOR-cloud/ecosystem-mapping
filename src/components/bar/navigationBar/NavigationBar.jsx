import React from "react";

import { Box, Circle, HStack, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { HomeAlt } from "@styled-icons/boxicons-regular";
import PropTypes from "prop-types";

import Authentication from "../../authentication/Authentication";
import { blueColor } from "../../../helper/constant";

const DividerLine = styled.div`
  background-color: #000000;
  height: 40px;
  width: 1px;
`;

function MyDivider() {
  return (
    <Box paddingX={3}>
      <DividerLine />
    </Box>
  );
}

const BlueHome = styled(HomeAlt)`
  color: ${blueColor};
`;

function NavigationBar(props) {
  const { title, additionalButtons, primaryButton } = props;

  return (
    <React.Fragment>
      <HStack
        height="75px"
        justify="space-between"
        paddingX={10}
        shadow="base"
        bg="white"
      >
        <HStack>
          <Circle border={"2px"} borderColor={"brand.500"} padding="4px">
            <BlueHome size="22.5" title="Home" />
          </Circle>
          <MyDivider />
          <Text fontSize={"xl"}>{title}</Text>
        </HStack>
        <HStack>
          {/* Button located to the left side of the primary button (filter for the canvas page */}
          {additionalButtons}
          {/* Primary button */}
          {primaryButton}
          <MyDivider />
          <Authentication />
        </HStack>
      </HStack>
    </React.Fragment>
  );
}

NavigationBar.propTypes = {
  additionalButtons: PropTypes.element,
  title: PropTypes.string.isRequired,
  primaryButton: PropTypes.element.isRequired,
};

export default NavigationBar;
