import React, { useContext, forwardRef } from "react";

import { Box, HStack } from "@chakra-ui/react";
import styled from "styled-components";

import { CanvasProvider } from "../../../pages/MapCanvasPage";

const SectionCanvas = styled.div`
  width: 100%;
  height: 100%;
  border-right: ${({ isLastSection }) =>
    isLastSection ? "none" : "1px solid"};
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

const BackgroundCanvas = forwardRef((props, ref) => {
  const sectionCanvas = [1, 2, 3, 4, 5];
  const subSectionCanvas = [1, 2, 3];
  const canvasProvider = useContext(CanvasProvider);

  return (
    <Box ref={ref}
      h={`calc(100% - ${canvasProvider.isFilterOpen ? 135 : 75}px)`}
      w="calc(100vw - 150px)"
      bg="white"
      position="absolute"
    >
      <HStack h="100%" spacing={0}>
        {sectionCanvas.map((canvas, index) => {
          const isLastSection = canvas === sectionCanvas.length;

          return (
            <SectionCanvas
              key={index}
              isLastSection={isLastSection}
              index={index}
            >
              {subSectionCanvas.map((canvas, index) => {
                const isLastSubSection = canvas === subSectionCanvas.length;

                return (
                  <SubSectionCanvas
                    key={canvas}
                    isLastSubSection={isLastSubSection}
                    index={index}
                  />
                );
              })}
            </SectionCanvas>
          );
        })}
      </HStack>
    </Box>
  );
});

export default BackgroundCanvas;
