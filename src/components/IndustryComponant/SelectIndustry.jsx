import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import IndustrySelectComponent from "./IndustrySelectComponent";
import { SubIndustryselectComponent } from "./SubIndustryselectComponent";

const SelectIndustry = (props) => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      <IndustrySelectComponent
        data={props.industries}
        industry={props.locationData.industry}
        selectedIndustry={(s) => props.createMapCallback("industry", s)}
      />
      <SubIndustryselectComponent
        data={props.subindustries}
        subIndustry={props.locationData.subIndustry}
        selectedSubindustries={(s) => props.createMapCallback("subIndustry", s)}
      />
    </SimpleGrid>
  );
};
export { SelectIndustry };