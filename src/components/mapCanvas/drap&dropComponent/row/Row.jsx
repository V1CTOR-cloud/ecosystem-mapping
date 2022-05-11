import React, { useEffect, useRef } from "react";

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Text, Center, Box } from "@chakra-ui/react";

import {
  greyHoverColor,
  market,
  market_and_organization,
  mediumPadding,
  organization,
  smallPadding,
} from "../../../../helper/constant";
import ServiceContainer from "../service/ServiceContainer";

const RowContainer = styled.div`
  background: ${(props) =>
    props.isDraggingOver ? greyHoverColor : "transparent"};
  transition: background-color 0.1s ease-in-out;
  flex-grow: 1;
  min-height: 180px;
  margin-bottom: ${(props) => (props.id === organization ? 0 : mediumPadding)};
  margin-top: ${(props) => (props.id === market ? smallPadding : 0)};
  position: relative;
`;

const NumberContainer = styled.div`
  width: calc(100% / 6);
`;

function Row(props) {
  const numbers = [-2, -1, 0, 1, 2, 3];
  const rowRef = useRef();

  useEffect(() => {
    const height = rowRef.current.clientHeight;
    const tempHeights = props.heights[0];

    if (props.row.id === market) {
      tempHeights[0] = height;
      props.heights[1](tempHeights);
    } else if (props.row.id === market_and_organization) {
      tempHeights[1] = height;
      props.heights[1](tempHeights);
    } else {
      tempHeights[2] = height;
      props.heights[1](tempHeights);
    }
  });

  return (
    <Droppable droppableId={props.row.id}>
      {(
        provided,
        snapshot //Wrapper that have all the services of a specific section (market/organization)
      ) => {
        return (
          <RowContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            id={props.row.id}
          >
            <Box ref={rowRef} h="100%" minH="180px">
              {props.services.map((service, index) => (
                <Box zIndex={2} position="relative" key={service.id}>
                  <ServiceContainer
                    service={service}
                    index={index}
                    handleServiceClick={props.handleServiceClick}
                  />
                </Box>
              ))}
              {provided.placeholder}
              {props.row.id === market_and_organization && (
                <Box
                  zIndex={1}
                  w="100%"
                  position="absolute"
                  display="flex"
                  justifyContent="space-between"
                  align="center"
                  // Set the phases number in the middle of the row
                  top={rowRef.current.clientHeight / 2 - 35 + "px"}
                >
                  {numbers.map((number) => {
                    return (
                      <NumberContainer key={number}>
                        <Box
                          borderRadius="50%"
                          border={`2px solid ${greyHoverColor}`}
                          w="70px"
                          h="70px"
                        >
                          <Center h="100%" w="100%">
                            <Text fontSize="30px" textColor={greyHoverColor}>
                              {number}
                            </Text>
                          </Center>
                        </Box>
                      </NumberContainer>
                    );
                  })}
                </Box>
              )}
            </Box>
          </RowContainer>
        );
      }}
    </Droppable>
  );
}

export default Row;
