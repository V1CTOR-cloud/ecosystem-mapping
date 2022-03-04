import React from 'react';

import PublishServiceConfirm from '../../components/PublishServiceConfirm';

export default {
  title: 'Components/Publish Notify',
  component: PublishServiceConfirm,
}

const Template = (args) => <PublishServiceConfirm {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});