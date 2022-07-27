import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
  Stack
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import EmptyText from "./EmptyText";

function MapAccordion(props) {
  const { isGrid, accordionItems } = props;

  return (
    <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
      {accordionItems.map((accordionItem, index) => {
        return (
          <AccordionItem key={index} border="none">
            <h2>
              <AccordionButton paddingX={10}>
                <AccordionIcon marginRight={5} />
                <Text fontSize="lg">{accordionItem.title}</Text>
              </AccordionButton>
            </h2>

            <AccordionPanel
              paddingTop={5}
              paddingX={7}
              bg={
                accordionItem.content.length === 0
                  ? "blackAlpha.100"
                  : undefined
              }
            >
              <Stack
                direction={
                  isGrid && accordionItem.content.length !== 0
                    ? "row"
                    : "column"
                }
                wrap="wrap"
                w="100%"
                spacing={0}
              >
                {accordionItem.content.length === 0 ? (
                  <EmptyText index={index} />
                ) : accordionItem.content.every((item) => !item.props.data.isVisible) ?
                  <Text textAlign="center" w="100%">No result</Text> : (
                    accordionItem.content.map((item, index) => {
                      if (item.props.data.isVisible) {
                        return (
                          <Box
                            key={index}
                            padding={isGrid ? "0 0 2rem 0.75rem" : "0"}
                          >
                            {item}
                          </Box>
                        );
                      }
                      return null;
                    })
                  )}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default MapAccordion;

MapAccordion.defaultProps = {
  isGrid: false
};

MapAccordion.propTypes = {
  /**
   * Define the content display of the accordion either in grid mode or in list mode.
   *
   * This argument will depend on what we are putting inside accordionItems.content, if we are giving some component Grid
   * then it will be better to set this argument to true and if we are passing some List component set it to false.
   */
  isGrid: PropTypes.bool.isRequired,
  /**
   * Array of object that define the content of the accordion.
   */
  accordionItems: PropTypes.array.isRequired
};
