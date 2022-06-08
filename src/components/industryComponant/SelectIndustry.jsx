import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";

import SelectIndustryComponent from "./SelectIndustryComponent";
import SelectSubIndustryComponent from "./SelectSubIndustryComponent";

const SelectIndustry = (props) => {
  const { industries, locationData, onIndustryChange, subIndustries } = props;
  return (
    <SimpleGrid columns={2} spacing={4}>
      <SelectIndustryComponent
        data={industries}
        industry={locationData.industry}
        selectedIndustry={(s) => onIndustryChange("industry", s)}
      />
      <SelectSubIndustryComponent
        data={subIndustries}
        subIndustry={locationData.subIndustry}
        selectedSubIndustry={(s) => onIndustryChange("subIndustry", s)}
      />
    </SimpleGrid>
  );
};

SelectIndustry.propTypes = {
  industries: PropTypes.array.isRequired,
  subIndustries: PropTypes.object.isRequired,
  locationData: PropTypes.object.isRequired,
  onIndustryChange: PropTypes.func.isRequired,
};

export default SelectIndustry;
