import React from 'react';

import LocationDropdown from '../../components/LocationDropdown';

export default {
  title: 'Startup/Location Dropdown',
  component: LocationDropdown,
}

const Template = (args) => <LocationDropdown {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});