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
  const { item, onChange, width, isDisabled, wantScroll, items } = props;
  const [value, setValue] = useState(item);

  useEffect(() => {
    setValue(item);
  }, [item]);

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
  wantScroll: PropTypes.bool,
  isDisabled: PropTypes.bool,
  width: PropTypes.string,
  item: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MenuComponent;
