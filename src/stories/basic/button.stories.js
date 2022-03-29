import React from "react";

import ButtonComponent from "../../components/basic/Button";

export default {
  title: "Button",
  component: ButtonComponent,
};

const ButtonComponentTemplate = (args) => {
  return (
    <ButtonComponent
      isPrimary={args.isPrimary}
      onClick={args.onClick}
      text={args.text}
      margin={args.margin}
    />
  );
};

export const Primary = ButtonComponentTemplate.bind({});

Primary.args = {
  isPrimary: true,
  text: "Primary button",
  onClick: () => {},
};

export const Secondary = ButtonComponentTemplate.bind({});

Secondary.args = {
  text: "Secondary button",
  onClick: () => {},
};
