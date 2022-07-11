import React from "react";

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

const NumberContainer = styled.div`
  width: calc(100% / 6);
`;

function Row(props) {
  const { row, services, handleServiceClick, isFiltersActive } = props;
  const numbers = [-2, -1, 0, 1, 2, 3];

  return (
    <Box h="100%">
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
                {services.map((service, index) => (
                  <Box key={service.id} zIndex={2} position="relative">
                    <ServiceContainer
                      service={service}
                      index={index}
                      handleServiceClick={handleServiceClick}
                      isFilterActive={isFiltersActive}
                    />
                  </Box>
                ))}
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
                        <NumberContainer key={number}>
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
};

export default Row;
