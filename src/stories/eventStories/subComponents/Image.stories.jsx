import React from "react";
import SDP from "../../../components/reusable-components/EventImageComponent";
import data from "../mockData/mock";
import { ChakraProvider } from "@chakra-ui/react";

export default {
	title: "Startup/Image",
	component: SDP,
};
const Template = (args) => (
	<ChakraProvider>
		<SDP {...args} data={data.getdata().eventProfiles[0]} />
	</ChakraProvider>
);
export const ImageComponent = Template.bind({});

