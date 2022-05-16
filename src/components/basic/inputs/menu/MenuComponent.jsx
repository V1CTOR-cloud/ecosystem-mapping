import React, { useState } from "react";

import { Button, MenuButton, MenuItem, MenuList, Menu } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function MenuComponent(props) {
  const [value, setValue] = useState(props.item);

  function handleOnChange(event) {
    setValue(event.target.lastChild.data);
    props.onChange(event.target.lastChild.data);
  }

  return (
    <Menu>
      <MenuButton
        w={props.width ? props.width : undefined}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {value}
      </MenuButton>
      <MenuList>
        {props.items.map((item) => {
          return (
            <MenuItem key={item.id} onClick={(event) => handleOnChange(event)}>
              {item.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default React.memo(MenuComponent);
