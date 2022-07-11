import React from "react";

import DatePickerComponent from "../../components/basic/inputs/date/DatePickerComponent";

export default {
  title: "Mapping App/Basic/Date Picker",
  component: DatePickerComponent,
  parameters: {
    componentSubtitle: "Allow the user to pick a date with an precise time.",
  },
  argTypes: {
    initialDate: {
      description: "Set the initial date of to the component if we have one.",
    },
    handleDateChange: {
      description:
        "Function that will update the value of the model with a setState for example.",
    },
  },
};

export function DatePicker(args) {
  return <DatePickerComponent {...args} handleDateChange={() => {}} />;
}

DatePicker.args = {
  initialDate: new Date(),
};
