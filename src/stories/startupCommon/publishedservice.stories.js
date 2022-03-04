import React from 'react';

import PublishedServiceForm from '../../components/PublishedServiceForm';

export default {
  title: 'Components/Published Service',
  component: PublishedServiceForm,
}

const Template = (args) => <PublishedServiceForm {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});