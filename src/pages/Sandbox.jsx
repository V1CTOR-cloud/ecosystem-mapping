import React from "react";

import {Box, Button, Text} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";

import {decrement, increment} from "redux/actions";

const Sandbox = () => {

    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <Box>
            <Button
                onClick={() => {
                    dispatch(increment());
                }}
            >
                +
            </Button>
            <Button
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                -
            </Button>
            <Text>{counter}</Text>
        </Box>
    );
};

export default Sandbox;
