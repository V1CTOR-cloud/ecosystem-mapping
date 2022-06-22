import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Box, Link } from "@chakra-ui/react";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import Industry from "./Industry";

function MultiIndustryPicker(props) {
  const { initialValues, industriesList, onChange } = props;

  const [industries, setIndustries] = useState(initialValues);

  // Update the formValues everytime we change a field of an industryPicker.
  useEffect(() => {
    onChange(industries);
  }, [industries, onChange]);

  // Add industryPicker at the last index of the array.
  function handleAddIndustry() {
    setIndustries((previousState) => {
      return [...previousState, { mainIndustry: null, subIndustry: null }];
    });
  }

  // Remove the industryPicker selected.
  function handleRemoveIndustry(index) {
    const tempIndustries = [...industries];
    tempIndustries.splice(index, 1);
    setIndustries(tempIndustries);
  }

  return (
    <>
      <LabelWithTooltip
        label={"Industry"}
        tooltipText={"Tooltip industryPicker"}
        tooltipAriaLabel={"Industry"}
      />
      {industries.map((industry, index) => {
        return (
          <Box key={index} marginY={2}>
            <Industry
              industriesState={[industries, setIndustries]}
              index={index}
              items={industriesList}
              isFirst={index === 0}
              onRemoveIndustry={() => handleRemoveIndustry(index)}
            />
          </Box>
        );
      })}
      <Link color="brand.500" fontSize="xs" onClick={handleAddIndustry}>
        + Add another industry
      </Link>
    </>
  );
}

export default MultiIndustryPicker;

MultiIndustryPicker.propTypes = {
  /**
   * Array of object that contains all the industries, it comes from either the appProvider or the story loader.
   */
  industriesList: PropTypes.array.isRequired,
  /**
   * Array of object that contains all the initial industries.
   */
  initialValues: PropTypes.array.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};
