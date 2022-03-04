import React from 'react';

import ServiceChangesLog from '../../components/ServiceChangesLog';

export default {
  title: 'Components/Service Log',
  component: ServiceChangesLog,
}

const Template = (args) => <ServiceChangesLog {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});