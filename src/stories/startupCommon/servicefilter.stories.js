import React from 'react';

import ServiceFilter from '../../components/ServiceFilter';

export default {
  title: 'Components/Service Log',
  component: ServiceFilter,
}

const Template = (args) => <ServiceFilter {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});