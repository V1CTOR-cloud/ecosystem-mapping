import React from "react";

import { Box, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import DatePickerComponent from "./DatePickerComponent";

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
            initialDate={serviceStartTime}
            handleDateChange={onChangeStartTime}
          />
          <Box w="5px" h="1px" bg={"blackAlpha.700"} />
          <Box paddingLeft="70px">
            <DatePickerComponent
              initialDate={serviceEndTime}
              handleDateChange={onChangeEndTime}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

LabeledDatePickerComponent.propTypes = {
  /**
   * Text inside the tooltip to help the user understand the meaning of the label.
   */
  tooltipText: PropTypes.string.isRequired,
  /**
   * Text that will be read for the screen readers.
   */
  tooltipAriaLabel: PropTypes.string.isRequired,
  /**
   * Text to indicate to the user what the input corresponding to.
   */
  label: PropTypes.string.isRequired,
  /**
   * Initial value of the start time.
   */
  serviceStartTime: PropTypes.instanceOf(Date).isRequired,
  /**
   * Initial value of the end time.
   */
  serviceEndTime: PropTypes.instanceOf(Date).isRequired,
  /**
   * Function that will update the value of the model for the start time with a setState for example.
   */
  onChangeStartTime: PropTypes.func.isRequired,
  /**
   * Function that will update the value of the model for the end time with a setState for example.
   */
  onChangeEndTime: PropTypes.func.isRequired,
};

export default LabeledDatePickerComponent;
