import React from "react";
import Register from "../../../components/reusable-components/RegisterButtonComponent";
import { ChakraProvider } from "@chakra-ui/react";
export default {
	title: "Startup/RegisterButtton",
	component: Register,
};

const Template = () => (
<ChakraProvider><Register  /></ChakraProvider>
);

export const RegisterComponent = Template.bind({});
