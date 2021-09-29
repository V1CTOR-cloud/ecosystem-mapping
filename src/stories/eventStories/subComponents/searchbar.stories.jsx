import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SearchBar } from "components/reusable-components/SearchBar";
export default {
	title: "Startup/Search-Bar",
	component: SearchBar,
};

const Template = () => (
	<ChakraProvider>
		<SearchBar  />
	</ChakraProvider>
);

export const EventComponent = Template.bind({});
EventComponent.args = {};
