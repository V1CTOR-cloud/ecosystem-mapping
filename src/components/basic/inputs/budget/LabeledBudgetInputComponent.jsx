import React from "react";

import { Box, HStack, Text } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import InputComponent from "../input/inputComponent/InputComponent";
import IconButtonComponent from "../../Buttons/IconButtonComponent";
import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import {
  greyColor,
  smallFontSize,
  smallPadding,
  verySmallPadding,
} from "../../../../helper/constant";

function LabeledBudgetInputComponent(props) {
  function handleAddOrRemoveBudget(index) {
    if (index === props.budgets.length - 1) {
      props.handleAddBudget();
    } else {
      props.handleRemoveBudget(index);
    }
  }

  return (
    <React.Fragment>
      <LabelWithTooltip
        label={props.label}
        tooltipText={props.tooltipText}
        tooltipAriaLabel={props.tooltipAriaLabel}
      />

      <HStack>
        <Text
          w="150px"
          paddingBottom={verySmallPadding}
          color={greyColor}
          fontSize={smallFontSize}
        >
          Description
        </Text>
        <Text
          paddingLeft={smallPadding}
          paddingBottom={verySmallPadding}
          color={greyColor}
          fontSize={smallFontSize}
        >
          Amount/Range
        </Text>
      </HStack>
      {props.budgets.map((budget, index) => {
        return (
          <HStack key={index} paddingBottom={smallPadding}>
            <Box>
              <InputComponent
                value={budget.name}
                placeholder="Title ..."
                handleOnChange={(event) =>
                  props.handleBudgetNameChange(event, index)
                }
              />
            </Box>

            <Box w="100%" paddingX={smallPadding}>
              <InputComponent
                value={budget.value}
                placeholder="0.00€ - 10.00€"
                handleOnChange={(event) =>
                  props.handleBudgetValueChange(event, index)
                }
              />
            </Box>
            <Box w="30px" h="30px" paddingLeft={smallPadding}>
              <IconButtonComponent
                height="30px"
                width="15px"
                onClick={() => handleAddOrRemoveBudget(index)}
                icon={
                  index === props.budgets.length - 1 ? (
                    <AddIcon color={greyColor} />
                  ) : (
                    <CloseIcon color={greyColor} />
                  )
                }
              />
            </Box>
          </HStack>
        );
      })}
    </React.Fragment>
  );
}

export default React.memo(LabeledBudgetInputComponent);
