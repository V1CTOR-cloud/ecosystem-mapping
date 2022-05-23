import React from "react";

import styled from "styled-components";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Copy } from "@styled-icons/fa-regular";

import {
  borderRadius,
  smallPadding,
  titleFontSize,
  verySmallPadding,
} from "../../../../helper/constant";
import Service from "../../../../assets/servicesFocus.json";

const Container = styled.div`
  background-color: ${(props) => props.backgroundColor};
  position: absolute;
  height: 30px;
  z-index: 1;
  padding-left: ${smallPadding};
  padding-right: ${smallPadding};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: fade;
  border-radius: ${borderRadius};
  left: ${(props) => props.source.percent}%;
  width: calc(${(props) => props.target.percent - props.source.percent}%);
`;

function ServiceName(props) {
  const serviceFocus = Service.servicesFocus.find((result) => {
    return result.name.split(" ").join("") === props.service.serviceFocus;
  });

  const textColor = serviceFocus.textColor;
  const backgroundColor = serviceFocus.color;

  return (
    <Box position="relative">
      <Container
        {...props.provided.dragHandleProps}
        source={props.source}
        target={props.target}
        backgroundColor={backgroundColor}
        onClick={() => props.handleServiceClick(props.service)}
      >
        <HStack h="30px">
          {props.service.serviceStatus === "Draft" && (
            <Box paddingBottom={"5px"} paddingRight={verySmallPadding}>
              <Copy size="15" color={textColor} />
            </Box>
          )}
          <Text
            h="100%"
            fontSize={titleFontSize}
            color={textColor}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nonwrap"
          >
            {props.service.serviceName}
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}

export default ServiceName;
