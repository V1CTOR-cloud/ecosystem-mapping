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
          w={width ? width : undefined}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          isDisabled={isDisabled ? isDisabled : false}
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
};

MenuComponent.propTypes = {
  wantScroll: PropTypes.bool,
  isDisabled: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MenuComponent;
