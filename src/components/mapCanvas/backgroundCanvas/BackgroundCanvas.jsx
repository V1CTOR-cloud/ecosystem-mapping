import React, { useContext, useLayoutEffect, useState } from "react";

import { Box, HStack } from "@chakra-ui/react";
import styled from "styled-components";

import PropTypes from "prop-types";
import { CanvasProvider } from "../../../pages/MapCanvasPage";

const SectionCanvas = styled.div`
  width: 100%;
  height: 100%;
  border-left: ${({ isLastSection, index }) =>
    isLastSection ? "1px dashed" : index % 3 ? "1px dashed" : "1px solid"};
  border-right:  ${({ isLastSection }) =>
    isLastSection ? "1px solid" : "none"};
  border-left-color: #c5d6fc;
  border-right-color: #c5d6fc;
  display: flex;
`;

const SubSectionCanvas = styled.div`
  width: 100%;
  height: 100%;
  border-right: ${({ isLastSubSection }) =>
    isLastSubSection ? "none" : "1px dashed"};
  border-right-color: #c5d6fc;
`;


//export const Remote = forwardRef((props, ref) => {

//const BackgroundCanvas = forwardRef((props, ref) => {
const BackgroundCanvas = (props) => {
  //const sectionCanvas = [1, 2, 3, 4,];
  const sectionCanvas = new Array(15).fill(0);
  const subSectionCanvas = [1, 2, 3];
  const canvasProvider = useContext(CanvasProvider);
  console.log("BG cols ", props);
  const { parentRef } = props;


  console.log('height: ', parentRef.current.clientHeight);

  console.log('width: ', parentRef.current.clientWidth);
  const backgroundY = -1 * (parentRef.current.clientHeight - 40);
  const backgroundW = (parentRef.current.clientWidth - 204);
  const colW = backgroundW / 15;
  //console.log("COLW ", backgroundW, colW);

  /*
useLayoutEffect(() => {

  console.log('height: ', parentRef.current.clientHeight);

  console.log('width: ', parentRef.current.clientWidth);
  console.log('Col width: ', parentRef.current.clientWidth / 12);
  //const servicePadding = parentRef.current.clientWidth / 12;
  //setServiceContainerWidth(backGroundCanvas.current.clientWidth - (servicePadding * 2));
  //setServicePadding(backGroundCanvas.current.clientWidth / 18);
  //w={backGroungCanvas.current?.clientWidth ? backGroundCanvas.current.clientWidth - (servicePadding * 2) : '100%'}
  // 1300 width... erotus 277
  // 1577 
  //w={serviceContainerWidth}
}, []);
*/


  return (
    <Box
      bg="white"

      w={backgroundW}
      h={"100%"}
      position={"relative"}
      top={backgroundY}
    >
      <Box
        bg="white"

        w={"100%"}
        h={"100%"}
        position={"relative"}
        top={0}
      >
        <HStack h="100%" spacing={0}>
          {sectionCanvas.map((canvas, index) => {
            const isLastSection = index === sectionCanvas.length - 1;

            return (
              <SectionCanvas
                key={index}
                isLastSection={isLastSection}
                index={index}
              />


            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};


BackgroundCanvas.propTypes = {
  parentRef: PropTypes.object.isRequired,
}
export default BackgroundCanvas;
