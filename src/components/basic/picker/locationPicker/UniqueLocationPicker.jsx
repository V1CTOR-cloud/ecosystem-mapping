import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import Location from "./Location";

function UniqueLocationPicker(props) {
  const { initialValues, onChange, locationsList } = props;
  const { t } = useTranslation();
  const [locations, setLocations] = useState(initialValues);

  // Update the formValues everytime we change a field of a location.
  useEffect(() => {
    onChange(locations);
  }, [locations, onChange]);

  return (
    <>
      <LabelWithTooltip
        label={t("mapping.dashboard.form.location.picker")}
        tooltipText={t("mapping.dashboard.form.location.picker.tooltip")}
        tooltipAriaLabel={t("mapping.dashboard.form.location.picker")}
      />
      <Box marginY={2}>
        <Location
          locationsState={[locations, setLocations]}
          index={0}
          items={locationsList}
        />
      </Box>
    </>
  );
}

export default UniqueLocationPicker;

UniqueLocationPicker.propTypes = {
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
