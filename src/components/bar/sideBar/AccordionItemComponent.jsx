import React from "react";

import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import IconButtonComponent from "../../basic/Buttons/IconButtonComponent";
import {
  blackColor,
  blueColor,
  greyColor,
  smallPadding,
  verySmallPadding,
  whiteHoverColor,
} from "../../../helper/constant";

function AccordionItemComponent(props) {
  const { t } = useTranslation();

  return (
    <AccordionItem>
      {({ isExpanded }) => {
        const isSelected = isExpanded;

        if (props.isCollapsed) {
          isExpanded = false;
        }

        return (
          <>
            <AccordionButton
              padding={verySmallPadding}
              borderBottom="solid 3px"
              borderColor={isSelected ? blueColor : greyColor}
              _focus={{ bg: whiteHoverColor }}
            >
              {props.isCollapsed && (
                <IconButtonComponent
                  icon={
                    isSelected ? props.button.icon[0] : props.button.icon[1]
                  }
                  onClick={props.onClick}
                  height="30px"
                  width="30px"
                />
              )}
              {!props.isCollapsed && (
                <HStack>
                  <IconButtonComponent
                    icon={
                      isSelected ? props.button.icon[0] : props.button.icon[1]
                    }
                    onClick={props.onClick}
                    height="30px"
                    width="30px"
                  />
                  <Text
                    paddingLeft={smallPadding}
                    color={isSelected ? blueColor : blackColor}
                  >
                    {props.button.title}
                  </Text>
                </HStack>
              )}
            </AccordionButton>
            {isExpanded && (
              <AccordionPanel>
                {props.button.children.length !== 0 ? (
                  props.button.children
                ) : (
                  <Box
                    w="100%"
                    h="100%"
                    align="center"
                    paddingTop={smallPadding}
                  >
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

export default AccordionItemComponent;
