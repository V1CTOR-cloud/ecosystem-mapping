import React from "react";
import Checkboxes from "assets/applicationType.json";
import { Box, Grid } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

const AppCheckboxComponent = ({radioValue,val}) => {
  return (
    <RadioGroup
    value={val}
      onChange={(e) => {
        radioValue(e)
      }}
    >
      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={3}
        className="mod-checklbl service-type"
      >
        {Checkboxes.AppType.map((app) => (
          <Box pos="relative">
            <Radio value={app.name}>{app.name}</Radio>
          </Box>
        ))}
      </Grid>
    </RadioGroup>
  );
};
export default AppCheckboxComponent;
