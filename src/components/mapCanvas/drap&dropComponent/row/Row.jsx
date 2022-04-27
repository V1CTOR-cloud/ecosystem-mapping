import React from "react";

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import {
  greyHoverColor,
  mediumPadding,
  smallPadding,
} from "../../../../helper/constant";
import ServiceContainer from "../service/ServiceContainer";

const RowContainer = styled.div`
  background: ${(props) =>
    props.isDraggingOver ? greyHoverColor : "transparent"};
  transition: background-color 0.1s ease-in-out;
  flex-grow: 1;
  min-height: 180px;
  margin-bottom: ${(props) =>
    props.id === "Organisation" ? 0 : mediumPadding};
  margin-top: ${(props) => (props.id === "Market" ? smallPadding : 0)};
  position: relative;
`;

function Row(props) {
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
            {props.services.map((service, index) => (
              <ServiceContainer
                key={service.id}
                service={service}
                index={index}
              />
            ))}
            {provided.placeholder}
            {/*TODO faire les numéro: trouver une solution pour les centrer automatiquement au milieu*/}
            {/*{props.row.id === "market_organization" && (*/}
            {/*  <Box*/}
            {/*    zIndex="100000"*/}
            {/*    bg="#555555"*/}
            {/*    w="100%"*/}
            {/*    position="absolute"*/}
            {/*    display="flex"*/}
            {/*    justifyContent="space-between"*/}
            {/*  >*/}
            {/*    <Box>-2</Box>*/}
            {/*    <Box>-1</Box>*/}
            {/*    <Box>0</Box>*/}
            {/*    <Box>1</Box>*/}
            {/*    <Box>2</Box>*/}
            {/*    <Box>3</Box>*/}
            {/*  </Box>*/}
            {/*)}*/}
          </RowContainer>
        );
      }}
    </Droppable>
  );
}

export default Row;
