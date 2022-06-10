import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import MenuComponent from "./MenuComponent";

function LabeledMenu(props) {
  const { tooltipText, tooltipAriaLabel, label, item, items, onChange } = props;
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <MenuComponent item={item} items={items} onChange={onChange} />
    </Box>
  );
}

LabeledMenu.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LabeledMenu;
