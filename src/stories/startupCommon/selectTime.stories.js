import React from 'react';

import SelectTime from '../../components/SelectTime';

export default {
  title: 'Startup/Select Time',
  component: SelectTime,
}

const Template = (args) => <SelectTime {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});