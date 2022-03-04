import React from 'react';

import SaveAsDraftConfirm from '../../components/SaveAsDraftConfirm';

export default {
  title: 'Components/Save Notify',
  component: SaveAsDraftConfirm,
}

const Template = (args) => <SaveAsDraftConfirm {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});