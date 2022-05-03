import React from "react";

import { Box, HStack } from "@chakra-ui/react";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import DatePickerComponent from "./DatePickerComponent";
import { greyColor } from "../../../../helper/constant";

function LabeledDatePickerComponent(props) {
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={props.tooltipText}
        tooltipAriaLabel={props.tooltipAriaLabel}
        label={props.label}
      />
      <Box>
        <HStack justifyContent="space-between">
          <DatePickerComponent
            date={props.serviceStartTime}
            handleDateChange={props.handleServiceStartTimeChange}
          />
          <Box w="5px" h="1px" bg={greyColor} />
          <Box paddingLeft="70px">
            <DatePickerComponent
              date={props.serviceEndTime}
              handleDateChange={props.handleServiceEndTimeChange}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default LabeledDatePickerComponent;
