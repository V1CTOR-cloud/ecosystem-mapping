import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { EventListingComponent } from "components/core-components/EventListingComponent";
import data from "./mockData/mock"
export default {
	title: "Startup/Event-Listing",
	component: EventListingComponent,
};



const Template = () => (
	
	<ChakraProvider>
		<EventListingComponent data={data.getdata()}  widthValue={()=>{}} />
	</ChakraProvider>
);

export const EventComponent = Template.bind({});
EventComponent.args = {};
