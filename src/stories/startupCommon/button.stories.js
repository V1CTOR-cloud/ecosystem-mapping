import React from 'react';
import Button from 'components/MapButton';

export default {
  title: 'Startup/Button',
  component: Button,
};

const Template = () => (
    <Button setFormOpen={()=>{}}/>
);

export const ButtonComp = Template.bind({});
ButtonComp.args = {};
