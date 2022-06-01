import React from "react";

import { Box, HStack } from "@chakra-ui/react";

import { whiteColor } from "../../../helper/constant";
import styled from "styled-components";

const SectionCanvas = styled.div`
  width: 100%;
  border-right: ${(props) => (props.isLastSection ? "none" : "1px solid")};
  border-right-color: #c5d6fc;
  height: 100%;
  display: flex;
`;

const SubSectionCanvas = styled.div`
  width: 100%;
  border-right: ${(props) => (props.isLastSubSection ? "none" : "1px dashed")};
  border-right-color: #c5d6fc;
  height: 100%;
  display: flex;
`;

function BackgroundCanvas(props) {
  const sectionCanvas = [1, 2, 3, 4, 5, 6];
  const subSectionCanvas = [1, 2, 3];

  const height = (props.isFilterOpen ? 135 : 75) + 12;

  return (
    <Box
      h={`calc(100% - ${height}px)`}
      w="calc(100% - 200px)"
      bg={whiteColor}
      position="absolute"
    >
      <HStack h="100%" justify="space-evenly">
        {sectionCanvas.map((canvas) => {
          const isLastSection = canvas === sectionCanvas.length;

          return (
            <SectionCanvas key={canvas} isLastSection={isLastSection}>
              {subSectionCanvas.map((canvas) => {
                const isLastSubSection = canvas === subSectionCanvas.length;

                return (
                  <SubSectionCanvas
                    key={canvas}
                    isLastSubSection={isLastSubSection}
                  />
                );
              })}
            </SectionCanvas>
          );
        })}
      </HStack>
    </Box>
  );
}

export default BackgroundCanvas;
