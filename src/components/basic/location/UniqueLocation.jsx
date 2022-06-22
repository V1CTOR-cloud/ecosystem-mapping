import React from "react";

import { useTranslation } from "react-i18next";

import LabelWithTooltip from "../labelWithTooltip/LabelWithTooltip";
import LocationComponent from "./LocationComponent";
import PropTypes from "prop-types";

function UniqueLocation(props) {
  const { initialValue, locationsList, onChange } = props;
  const { t } = useTranslation();
  return (
    <>
      <LabelWithTooltip
        tooltipText={t("mapping.canvas.form.location.tooltip")}
        label={t("mapping.canvas.form.location")}
        tooltipAriaLabel={t("mapping.canvas.form.location")}
      />
      <LocationComponent
        initialLocation={initialValue}
        onChange={onChange}
        locationsList={locationsList}
      />
    </>
  );
}

UniqueLocation.propTypes = {
  /**
   * List of all the locations available.
   */
  locationsList: PropTypes.array.isRequired,
  /**
   * Initial location given to the fields. Mainly use during the edition of a form.
   */
  initialValue: PropTypes.object.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};

export default UniqueLocation;
