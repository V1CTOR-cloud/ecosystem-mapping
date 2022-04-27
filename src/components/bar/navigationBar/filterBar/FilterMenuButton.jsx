import React from "react";

import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";

import {
  blackColor,
  blueColor,
  defaultFontFamily,
  defaultFontSize,
  whiteActiveColor,
  whiteColor,
  whiteHoverColor,
} from "../../../../helper/constant";
import ButtonComponent from "../../../basic/ButtonComponent";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function FilterMenuButton(props) {
  //TODO faire avec des checkbox: enlève le none et a la place du all on met la chckbox parent.
  //TODO quand on filtre on garde ceux actif pour enlever ceux qui ne le sont pas.
  return (
    //  Wrap into a box because we have a warning in the console about margin error.
    <Box>
      <Menu closeOnSelect={false} margin="0px">
        <MenuButton
          as={Button}
          bg={props.isButtonActive ? whiteActiveColor : whiteColor}
          color={props.isButtonActive ? blueColor : blackColor}
          _hover={{ bg: whiteHoverColor }}
          _focus={{ boxShadow: "none" }}
          _active={{ bg: whiteActiveColor, color: blueColor }}
        >
          {props.text}
        </MenuButton>
        <MenuList>
          <HStack>
            <ButtonComponent
              buttonText="All"
              isWithoutBorder={true}
              onClick={() => props.handleAllClick(props.filter)}
              color={props.filter.isAllSelected ? blueColor : blackColor}
            />
            <ButtonComponent
              buttonText="None"
              isWithoutBorder={true}
              color={blackColor}
              onClick={props.handleNoneClick}
            />
          </HStack>
          <MenuOptionGroup type="checkbox">
            {props.items.map((item) => (
              <MenuItemOption
                key={item.name}
                value={item.name}
                onClick={() => props.handleItemClick(props.filter, item)}
                fontFamily={defaultFontFamily}
                fontSize={defaultFontSize}
              >
                {item.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default FilterMenuButton;
