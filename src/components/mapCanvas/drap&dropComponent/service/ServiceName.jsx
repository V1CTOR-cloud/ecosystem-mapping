import React from "react";

import styled from "styled-components";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Copy } from "@styled-icons/fa-regular";
import PropTypes from "prop-types";

import Service from "../../../../assets/servicesFocus.json";

const Container = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: absolute;
  height: 30px;
  z-index: 1;
  padding-left: 12px;
  padding-right: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: fade;
  cursor: pointer;
  border-radius: 4px;
  left: ${(props) => props.source.percent}%;
  width: calc(${(props) => props.target.percent - props.source.percent}%);
`;

function ServiceName(props) {
  const { service, provided, source, target, handleServiceClick } = props;
  const serviceFocus = Service.servicesFocus.find((result) => {
    return result.name.split(" ").join("") === service.serviceFocus;
  });

  const textColor = serviceFocus.textColor;
  const backgroundColor = serviceFocus.color;

  return (
    <Box position="relative">
      <Container
        {...provided.dragHandleProps}
        source={source}
        target={target}
        backgroundColor={backgroundColor}
        onClick={() => handleServiceClick(service)}
      >
        <HStack h="30px">
          {service.serviceStatus === "Draft" && (
            <Box paddingBottom={"5px"} paddingRight={2}>
              <Copy size="15" color={textColor} />
            </Box>
          )}
          <Text
            h="100%"
            fontSize={"xl"}
            color={textColor}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {service.serviceName}
          </Text>
        </HStack>
      </Container>
    </Box>
  );
}

ServiceName.propTypes = {
  service: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  handleServiceClick: PropTypes.func.isRequired,
};

export default ServiceName;
