import React from 'react';

import SelectDate from '../../components/SelectDate';

export default {
  title: 'Startup/Select Date',
  component: SelectDate,
}

const Template = (args) => <SelectDate {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});