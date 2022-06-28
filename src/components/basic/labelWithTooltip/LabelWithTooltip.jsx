import React from "react";

import { HStack, Text, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { QuestionOutlineIcon } from "@chakra-ui/icons";

function LabelWithTooltip(props) {
  const { label, tooltipText, tooltipAriaLabel } = props;
  return (
    <HStack marginBottom={3}>
      <Text marginRight={3}>{label}</Text>
      <Tooltip label={tooltipText} aria-label={tooltipAriaLabel}>
        <QuestionOutlineIcon w="12.5px" h="12.5px" />
      </Tooltip>
    </HStack>
  );
}

LabelWithTooltip.propTypes = {
  /**
   * Text to indicate to the user what the element corresponding to.
   */
  label: PropTypes.string.isRequired,
  /**
   * Text inside the tooltip to help the user understand the meaning of the label.
   */
  tooltipText: PropTypes.string.isRequired,
  /**
   * Text that will be read for the screen readers.
   */
  tooltipAriaLabel: PropTypes.string.isRequired,
};

export default LabelWithTooltip;
