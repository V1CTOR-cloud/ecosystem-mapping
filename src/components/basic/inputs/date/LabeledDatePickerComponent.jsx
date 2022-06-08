import React from "react";

import { Box, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import DatePickerComponent from "./DatePickerComponent";
import { greyColor } from "../../../../helper/constant";

function LabeledDatePickerComponent(props) {
  const {
    tooltipText,
    tooltipAriaLabel,
    label,
    serviceStartTime,
    serviceEndTime,
    onChangeStartTime,
    onChangeEndTime,
  } = props;
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <Box>
        <HStack justifyContent="space-between">
          <DatePickerComponent
            date={serviceStartTime}
            handleDateChange={onChangeStartTime}
          />
          <Box w="5px" h="1px" bg={greyColor} />
          <Box paddingLeft="70px">
            <DatePickerComponent
              date={serviceEndTime}
              handleDateChange={onChangeEndTime}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

LabeledDatePickerComponent.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  serviceStartTime: PropTypes.instanceOf(Date).isRequired,
  serviceEndTime: PropTypes.instanceOf(Date).isRequired,
  onChangeStartTime: PropTypes.func.isRequired,
  onChangeEndTime: PropTypes.func.isRequired,
};

export default LabeledDatePickerComponent;
