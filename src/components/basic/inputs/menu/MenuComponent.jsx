import React from "react";

import { Button, MenuButton, MenuItem, MenuList, Menu } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function MenuComponent(props) {
  function handleOnClick(event) {
    props.onClick(event.target.lastChild.data);
  }

  return (
    <Menu>
      <MenuButton
        w={props.width ? props.width : undefined}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {props.item}
      </MenuButton>
      <MenuList>
        {props.items.map((item) => {
          return (
            <MenuItem key={item.id} onClick={(event) => handleOnClick(event)}>
              {item.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default React.memo(MenuComponent);
