import React, { useEffect, useState } from "react";

import { Box, Link } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import Location from "./Location";

function MultiLocationPicker(props) {
  const { initialValues, onChange, locationsList } = props;
  const [locations, setLocations] = useState(initialValues);

  // Update the formValues everytime we change a field of a location.
  useEffect(() => {
    onChange(locations);
  }, [locations, onChange]);

  // Add industry at the last index of the array.
  function handleAddLocation() {
    setLocations((previousState) => {
      return [
        ...previousState,
        {
          continent: null,
          country: null,
          region: null,
          city: null,
        },
      ];
    });
  }

  // Remove the industry selected.
  function handleRemoveLocation(index) {
    const tempLocations = [...locations];
    tempLocations.splice(index, 1);
    setLocations(tempLocations);
  }

  return (
    <>
      <LabelWithTooltip
        label={"Location"}
        tooltipText={"Tooltip location"}
        tooltipAriaLabel={"Location"}
      />
      {locations.map((location, index) => {
        return (
          <Box key={index} marginY={2}>
            <Location
              locationsState={[locations, setLocations]}
              index={index}
              items={locationsList}
              onRemoveLocation={() => handleRemoveLocation(index)}
            />
          </Box>
        );
      })}
      <Link color="brand.500" fontSize="xs" onClick={handleAddLocation}>
        + Add another location
      </Link>
    </>
  );
}

export default MultiLocationPicker;

MultiLocationPicker.propTypes = {
  /**
   * Array of object that contains all the initial locations.
   */
  initialValues: PropTypes.array.isRequired,
  /**
   * Array of object that contains all the locations, it comes from either the appProvider or the story loader.
   */
  locationsList: PropTypes.array.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};
