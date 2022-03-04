import React from 'react';

import EditServiceModal from '../../components/EditServiceModal';

export default {
  title: 'Components/Edit Service',
  component: EditServiceModal,
}

const Template = (args) => <EditServiceModal {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});