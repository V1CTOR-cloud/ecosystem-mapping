import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { CloseButton, HStack, VStack } from "@chakra-ui/react";

import SelectComponent from "../../inputs/select/SelectComponent";

function Industry(props) {
  const { industriesState, index, items, onRemoveIndustry } = props;
  const [industryList, setIndustryList] = useState([]);
  const industry = industriesState[0][index];

  // Trigger once to initialise the list of main industries.
  useEffect(() => {
    const industryList = [];
    items.forEach((item) => {
      const tempSubIndustryList = [];
      item.subIndustries.forEach((subIndustry) => {
        tempSubIndustryList.push({
          id: subIndustry.industryId,
          name: subIndustry.industryName,
        });
      });

      industryList.push({
        id: item.industry.industryId,
        name: item.industry.industryName,
        subIndustries: tempSubIndustryList,
      });

      setIndustryList(industryList);
    });
  }, [items]);

  // Set the new values to the industryPicker, if we have selected the default value, then we set to null.
  function handleIndustryChange(isMainIndustry, value) {
    const tempValue = value === "Select option" ? null : value;

    if (isMainIndustry) {
      const tempIndustries = [...industriesState[0]];
      tempIndustries[index] = { mainIndustry: tempValue, subIndustry: null };
      industriesState[1](tempIndustries);
    } else {
      const tempIndustries = [...industriesState[0]];
      tempIndustries[index].subIndustry = tempValue;
      industriesState[1](tempIndustries);
    }
  }

  return (
    <VStack align="start">
      {index === 0 && (
        <HStack w="100%">
          <SelectComponent
            isWithLabel={true}
            label={"Main industry"}
            items={industryList}
            initialValue={industry.mainIndustry}
            onChange={(value) => handleIndustryChange(true, value)}
          />
          <SelectComponent
            isWithLabel={true}
            label={"Sub-industry"}
            items={
              industryList.length !== 0 && industry.mainIndustry != null
                ? industryList.find(
                    (element) => industry.mainIndustry === element.name
                  ).subIndustries
                : []
            }
            initialValue={industry.subIndustry}
            onChange={(value) => handleIndustryChange(false, value)}
            disabled={industry.mainIndustry === null}
          />
        </HStack>
      )}
      {index !== 0 && (
        <HStack w="100%">
          <SelectComponent
            items={industryList}
            onChange={(value) => handleIndustryChange(true, value)}
            initialValue={industry.mainIndustry}
          />
          <HStack w="100%">
            <SelectComponent
              items={
                industryList.length !== 0 && industry.mainIndustry != null
                  ? industryList.find(
                      (element) => industry.mainIndustry === element.name
                    ).subIndustries
                  : []
              }
              onChange={(value) => handleIndustryChange(false, value)}
              initialValue={industry.subIndustry}
              disabled={industry.mainIndustry === null}
            />
            <CloseButton onClick={onRemoveIndustry} color="brand.500" />
          </HStack>
        </HStack>
      )}
    </VStack>
  );
}

export default Industry;

Industry.defaultProps = {
  onRemoveIndustry: () => {},
};

Industry.propTypes = {
  /**
   * Function that will remove the selected industry from the list.
   */
  onRemoveIndustry: PropTypes.func,
  /**
   * Number that indicate which industry is currently map to get the value and setState it.
   */
  index: PropTypes.number.isRequired,
  /**
   * Select field that allow the user to pick through a predefined list of items.
   */
  items: PropTypes.array.isRequired,
  /**
   * Array that contains the list of industryPicker and the stateful function to update it.
   */
  industriesState: PropTypes.array.isRequired,
};
