import React, { useEffect, useState } from "react";

import {
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

function MenuComponent(props) {
  const { initialValue, onChange, width, isDisabled, wantScroll, items } =
    props;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleOnChange(event) {
    setValue(event.target.lastChild.data);
    onChange(event.target.lastChild.data);
  }

  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          variant="outline"
          color="black"
          borderColor="blackAlpha.500"
          _hover={{ bg: "blackAlpha.200" }}
          _active={{ bg: "blackAlpha.300" }}
          w={width ? width : undefined}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          isDisabled={isDisabled}
        >
          {value}
        </MenuButton>
        <MenuList h={wantScroll ? "300px" : "auto"} overflowY="scroll">
          {items.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={(event) => handleOnChange(event)}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

MenuComponent.defaultProps = {
  wantScroll: false,
  isDisabled: false,
  width: undefined,
};

MenuComponent.propTypes = {
  /**
   * Value that set (when menu is open) the list scrollable
   */
  wantScroll: PropTypes.bool,
  /**
   * Set the button unreachable or not.
   */
  isDisabled: PropTypes.bool,
  /**
   * Set the width of the button.
   */
  width: PropTypes.string,
  /**
   * Initial value of the menu.
   */
  initialValue: PropTypes.string.isRequired,
  /**
   * List of items to display in the menu.
   */
  items: PropTypes.array.isRequired,
  /**
   * Function to call when the value of the menu changes.
   */
  onChange: PropTypes.func.isRequired,
};

export default MenuComponent;
