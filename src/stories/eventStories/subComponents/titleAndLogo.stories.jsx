import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { LogoandTitle } from "components/reusable-components/LogoAndTitleComponent";
export default {
	title: "Startup/Logo-Title",
	component: LogoandTitle,
};

const Template = (args) => (
	<ChakraProvider>
		<LogoandTitle {...args}  />
	</ChakraProvider>
);

export const EventComponent = Template.bind({});
EventComponent.args = {
    title:"Startup Commons"
 };
