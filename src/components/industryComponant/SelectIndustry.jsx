import React from "react";

import { SimpleGrid } from "@chakra-ui/react";

import SelectIndustryComponent from "./SelectIndustryComponent";
import SelectSubIndustryComponent from "./SelectSubIndustryComponent";

const SelectIndustry = (props) => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      <SelectIndustryComponent
        data={props.industries}
        industry={props.locationData.industry}
        selectedIndustry={(s) => props.createMapCallback("industry", s)}
      />
      <SelectSubIndustryComponent
        data={props.subIndustries}
        subIndustry={props.locationData.subIndustry}
        selectedSubIndustry={(s) => props.createMapCallback("subIndustry", s)}
      />
    </SimpleGrid>
  );
};

export default SelectIndustry;
