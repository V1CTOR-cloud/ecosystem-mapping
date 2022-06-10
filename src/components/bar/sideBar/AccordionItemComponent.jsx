import React from "react";

import {
  Box,
  HStack,
  Text,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

function AccordionItemComponent(props) {
  const { isCollapsed, button } = props;
  const { t } = useTranslation();

  return (
    <AccordionItem>
      {({ isExpanded }) => {
        const isSelected = isExpanded;

        if (isCollapsed) {
          isExpanded = false;
        }

        return (
          <>
            <AccordionButton
              padding={2}
              borderBottom="solid 3px"
              borderColor={isSelected ? "brand.500" : "blackAlpha.400"}
              _focus={{ bg: "brand.50" }}
            >
              {isCollapsed && (
                <Icon
                  height="2rem"
                  width="2rem"
                  color={isSelected ? "brand.500" : "black"}
                >
                  {button.icon}
                </Icon>
              )}
              {!isCollapsed && (
                <HStack>
                  <Icon
                    height="2rem"
                    width="2rem"
                    color={isSelected ? "brand.500" : "black"}
                  >
                    {button.icon}
                  </Icon>
                  <Text
                    paddingLeft={3}
                    color={isSelected ? "brand.500" : "black"}
                  >
                    {button.title}
                  </Text>
                </HStack>
              )}
            </AccordionButton>
            {isExpanded && (
              <AccordionPanel>
                {button.children.length !== 0 ? (
                  button.children
                ) : (
                  <Box w="100%" h="100%" align="center" paddingTop={3}>
                    <Text>
                      {t("mapping.canvas.side.bar.toggle.no.element")}
                    </Text>
                  </Box>
                )}
              </AccordionPanel>
            )}
          </>
        );
      }}
    </AccordionItem>
  );
}

AccordionItemComponent.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  button: PropTypes.any.isRequired,
};

export default AccordionItemComponent;
