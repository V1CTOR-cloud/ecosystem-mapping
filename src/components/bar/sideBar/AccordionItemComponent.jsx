import React from "react";

import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { HStack, Text } from "@chakra-ui/react";

import MyIconButton from "../../basic/MyIconButton";
import {
  blackColor,
  blueColor,
  greyColor,
  smallPadding,
  verySmallPadding,
  whiteHoverColor,
} from "../../../helper/constant";

function AccordionItemComponent(props) {
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
                <MyIconButton
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
                  <MyIconButton
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
              <AccordionPanel>{props.button.children}</AccordionPanel>
            )}
          </>
        );
      }}
    </AccordionItem>
  );
}

export default AccordionItemComponent;
