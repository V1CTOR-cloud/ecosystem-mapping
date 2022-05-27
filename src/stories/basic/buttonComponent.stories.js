import React from "react";

import ButtonComponent from "../../components/basic/Buttons/ButtonComponent";

export default {
  title: "Button",
  component: ButtonComponent,
};

const ButtonComponentTemplate = (args) => {
  return (
    <ButtonComponent
      isPrimary={args.isPrimary}
      onClick={args.onClick}
      buttonText={args.buttonText}
      margin={args.margin}
    />
  );
};

export const Primary = ButtonComponentTemplate.bind({});

Primary.args = {
  isPrimary: true,
  buttonText: "Primary button",
  onClick: () => {},
};

export const Secondary = ButtonComponentTemplate.bind({});

Secondary.args = {
  buttonText: "Secondary button",
  onClick: () => {},
};
