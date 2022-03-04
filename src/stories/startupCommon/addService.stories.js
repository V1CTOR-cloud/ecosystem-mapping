import React from 'react';

import AddServiceModal from '../../components/ServiceComponents/AddServiceModal';

export default {
  title: 'Components/Add Service',
  component: AddServiceModal,
}

const Template = (args) => <AddServiceModal {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});