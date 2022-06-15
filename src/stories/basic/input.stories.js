import React, { useState } from "react";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";

import InputComponent from "../../components/basic/inputs/input/inputComponent/InputComponent";
import MultilineInputComponent from "../../components/basic/inputs/input/multilineInputComponent/MultilineInputComponent";
import NumberInputComponent from "../../components/basic/inputs/input/numberInputComponent/NumberInputComponent";
import { withChakra } from "../../../.storybook/preview";

export default {
  title: "Mapping App/Basic/Input",
  component: MultilineInputComponent,
  decorators: [withChakra],
  parameters: {
    componentSubtitle: "Allow the user to enter some value in the fields.",
  },
  argTypes: {
    placeholder: {
      description:
        "Text that will be displayed if the input is empty. It indicate what to type to the user.",
    },
    isRequired: {
      description:
        "Boolean to indicate if we want this field to be mandatory. Only available for the classic input.",
      defaultValue: { summary: "false" },
    },
    errorText: {
      description:
        "Display an error text when the field is empty. Working only when the field is marked as required.",
    },
    initialValue: {
      description:
        "Value that is given to the field during the first render of the component.",
    },
    onChange: {
      description:
        "Function that will update the value of the model with a setState for example.",
    },
  },
};

export function Classic(args) {
  const [isError, setIsError] = useState(false);

  const handleOnChange = (value) => {
    value === "" && args.isRequired ? setIsError(true) : setIsError(false);
  };

  return (
    <FormControl isInvalid={isError}>
      <InputComponent
        {...args}
        onChange={handleOnChange}
        initialValue={args.initialValue}
      />
      {isError && <FormErrorMessage>{args.errorText}</FormErrorMessage>}
    </FormControl>
  );
}

Classic.args = {
  placeholder: "Placeholder",
  isRequired: false,
  errorText: "Please enter something",
  initialValue: "Initial value",
};

export function Multiline(args) {
  return (
    <MultilineInputComponent
      {...args}
      value={args.initialValue}
      onChange={() => {}}
    />
  );
}

Multiline.args = {
  placeholder: "Placeholder",
  initialValue: "Initial value",
};

export function Number(args) {
  return (
    <NumberInputComponent
      {...args}
      value={args.initialValue}
      onChange={() => {}}
    />
  );
}

Number.args = {
  placeholder: "Placeholder",
  initialValue: 0.1,
};
