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
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
};

export default LabelWithTooltip;
