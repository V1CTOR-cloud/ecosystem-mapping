import React, { useEffect, useState } from "react";

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Text, Center, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import ServiceContainer from "../service/ServiceContainer";
import { market_and_organization } from "../../../../helper/constant";

const RowContainer = styled.div`
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "#BFBFBF" : "transparent"};
  transition: background-color 0.1s ease-in-out;
  flex-grow: 1;
  min-height: 100%;
  height: 100%;
  position: relative;
`;

const phaseMove = (props) => {
  const pos = [
    -1.2,  //-2
    -0.73,  // -1
    -0.24,  // 0
    0.27,   // 1
    0.76,  // 2
    1.23,  //3
  ]

  //console.log(props.colWidth, props.index, pos[props.index]);
  return { "position": "relative", "left": props.colWidth * pos[props.index + 2] + 'px' }

}
const NumberContainer = styled.div`
  width: calc(100% / 6);
  ${phaseMove};
`;

function Row(props) {
  const { row, services, handleServiceClick, isFiltersActive, parentRef } = props;
  const numbers = [-2, -1, 0, 1, 2, 3];

  const backgroundW = (parentRef.current.clientWidth - 204);
  const colW = backgroundW / 15;
  //console.log("COLW ", backgroundW, colW);
  /*
  useEffect(() => {
    console.log(backGroundCanvas);
    console.log('height: ', backGroundCanvas.current.clientHeight);

    console.log('width: ', backGroundCanvas.current.clientWidth);
    console.log('Col width: ', backGroundCanvas.current.clientWidth / 12);
    const servicePadding = backGroundCanvas.current.clientWidth / 12;
    setServiceContainerWidth(backGroundCanvas.current.clientWidth - (servicePadding * 2));
    //setServicePadding(backGroundCanvas.current.clientWidth / 18);
    //w={backGroungCanvas.current?.clientWidth ? backGroundCanvas.current.clientWidth - (servicePadding * 2) : '100%'}
    // 1300 width... erotus 277
    // 1577 
  }, []);
  w={serviceContainerWidth}
  */
  return (
    <Box h="100%" bg="white">
      <Droppable droppableId={row.id}>
        {(
          provided,
          snapshot //Wrapper that have all the services of a specific section (market/organization)
        ) => {
          return (
            <RowContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              id={row.id}
            >
              <Box w="100%">
                {services.map((service, index) => {
                  // Display only the service that have the property isVisible to true.
                  if (service.isVisible) {
                    return <Box key={service.id} zIndex={2} position="relative">
                      <ServiceContainer
                        service={service}
                        index={index}
                        handleServiceClick={handleServiceClick}
                        isFilterActive={isFiltersActive}
                      />
                    </Box>;
                  } else return null;
                })}
                {provided.placeholder}

                {row.id === market_and_organization && (
                  <Box
                    zIndex={1}
                    position="absolute"
                    top="0px"
                    w="100%"
                    h="100%"
                    display="flex"
                    justifyContent="space-between"
                    align="center"
                    alignItems="center"
                  >
                    {numbers.map((number) => {
                      return (
                        <NumberContainer key={number} index={number} colWidth={colW} >
                          <Box
                            borderRadius="50%"
                            border={"2px solid"}
                            borderColor={"blackAlpha.500"}
                            w="70px"
                            h="70px"
                          >
                            <Center h="100%" w="100%">
                              <Text
                                fontSize="30px"
                                textColor={"blackAlpha.500"}
                              >
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
    </Box>
  );
}

Row.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  isFiltersActive: PropTypes.bool.isRequired,
  services: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  handleServiceClick: PropTypes.func.isRequired,

  parentRef: PropTypes.object.isRequired,
};

export default Row;
