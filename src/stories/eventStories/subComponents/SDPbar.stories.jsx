import React from "react";
import SDP from "../../../components/reusable-components/SDPBarComponent";

export default {
	title: "Startup/SDP",
	component: SDP,
};

const Template = (args) => (
<SDP {...args} />
);

export const SdpComponent = Template.bind({});
SdpComponent.args = {
    from: 0,
    to:1
 };