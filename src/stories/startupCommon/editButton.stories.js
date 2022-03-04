import React from 'react';

import EditButton from '../../components/ServiceComponents/EditButton';

export default {
  title: 'Startup/Edit Button',
  component: EditButton,
}

const Template = (args) => <EditButton {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});