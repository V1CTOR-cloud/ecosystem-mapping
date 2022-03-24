import React from "react";

import { Box, Grid, Radio, RadioGroup } from "@chakra-ui/react";

import checkboxes from "assets/applicationType.json";


const RadioButtonsApplicationType = ({ radioValue, val }) => {
  return (
    <RadioGroup
      value={val}
      onChange={(e) => {
        radioValue(e);
      }}
    >
      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={3}
        className="mod-checklbl service-type"
      >
        {checkboxes.AppType.map((applicationType) => (
          <Box pos="relative">
            <Radio value={applicationType.name}>{applicationType.name}</Radio>
          </Box>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default RadioButtonsApplicationType;
