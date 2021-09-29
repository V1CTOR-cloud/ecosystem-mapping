import React from "react";
import {SDPScaleComponent} from "../../../components/reusable-components/SDPScaleComponemt";

export default {
	title: "Startup/SDPSingle",
	component: SDPScaleComponent,
};

const Template = (args) => (
<SDPScaleComponent  {...args} />
);

export const SdpComponent = Template.bind({});
SdpComponent.args = {
    from: 10,
    to:90,
    value:-2
 };