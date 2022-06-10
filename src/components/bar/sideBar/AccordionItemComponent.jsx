import React from "react";

import {
  Box,
  HStack,
  Text,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import IconButtonComponent from "../../basic/buttons/IconButtonComponent";
import PropTypes from "prop-types";

function AccordionItemComponent(props) {
  const { isCollapsed, button, onClick } = props;
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
                <IconButtonComponent
                  icon={isSelected ? button.icon[0] : button.icon[1]}
                  onClick={onClick}
                  height="30px"
                  width="30px"
                />
              )}
              {!isCollapsed && (
                <HStack>
                  <IconButtonComponent
                    icon={isSelected ? button.icon[0] : button.icon[1]}
                    onClick={onClick}
                    height="30px"
                    width="30px"
                  />
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
  onClick: PropTypes.func.isRequired,
};

export default AccordionItemComponent;
