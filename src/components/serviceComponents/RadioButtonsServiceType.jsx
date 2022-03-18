import React from "react";

import { Box, Grid, Radio, RadioGroup } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

import checkboxes from "assets/checkbox.json";

const RadioButtonsServiceType = ({ radioValue, val }) => {
  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  return (
    <RadioGroup
      value={val}
      onChange={(e) => {
        radioValue(e);
      }}
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={3}
        className="mod-checklbl service-type"
      >
        {checkboxes.checkbox.map((result) => (
          <Box pos="relative">
            <Radio value={result.name}>{result.name}</Radio>
            <CircleIcon
              className="service-circle"
              boxSize={5}
              color={result.color}
              float="right"
            />
          </Box>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default RadioButtonsServiceType;
