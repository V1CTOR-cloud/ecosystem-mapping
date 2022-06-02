import React, {useEffect, useState} from "react";

import {Button, MenuButton, MenuItem, MenuList, Menu, Box} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

function MenuComponent(props) {
    const [value, setValue] = useState(props.item);

    useEffect(() => {
        setValue(props.item);
    }, [props.item]);

    function handleOnChange(event) {
        setValue(event.target.lastChild.data);
        props.onChange(event.target.lastChild.data);
    }

    return (
        <Box>
            <Menu isLazy>
                <MenuButton
                    w={props.width ? props.width : undefined}
                    as={Button}
                    rightIcon={<ChevronDownIcon/>}
                    isDisabled={props.isDisabled ? props.isDisabled : false}
                >
                    {value}
                </MenuButton>
                <MenuList h={props.wantScroll ? "300px" : "auto"} overflowY="scroll">
                    {props.items.map((item) => {
                        return (
                            <MenuItem key={item.id} onClick={(event) => handleOnChange(event)}>
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

export default React.memo(MenuComponent);
