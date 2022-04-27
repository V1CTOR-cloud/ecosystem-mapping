import React from "react";

import styled from "styled-components";

import {
  borderRadius,
  smallPadding,
  titleFontSize,
} from "../../../../helper/constant";
import Checkboxes from "../../../../assets/checkbox.json";
import { Text } from "@chakra-ui/react";

const Container = styled.div`
  background-color: ${(props) => props.backgroundColor};
  position: absolute;
  height: 30px;
  z-index: 1;
  padding-left: ${smallPadding};
  padding-right: ${smallPadding};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${borderRadius};
  left: ${(props) => props.source.percent}%;
  width: ${(props) => props.target.percent - props.source.percent}%;
`;

function ServiceName(props) {
  const backgroundColor = Checkboxes.serviceFocus.find((result) => {
    return result.name === props.service.serviceFocus;
  }).color;

  const textColor = Checkboxes.serviceFocus.find((result) => {
    return result.name === props.service.serviceFocus;
  }).textColor;

  return (
    <Container
      {...props.provided.dragHandleProps}
      source={props.source}
      target={props.target}
      backgroundColor={backgroundColor}
    >
      <Text h="100%" fontSize={titleFontSize} color={textColor}>
        {props.service.serviceName}
      </Text>
    </Container>
  );
}

export default ServiceName;
