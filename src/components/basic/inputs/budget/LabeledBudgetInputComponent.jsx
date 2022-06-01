import React, { useState } from "react";

import { Box, HStack, Text } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import InputComponent from "../input/inputComponent/InputComponent";
import IconButtonComponent from "../../buttons/IconButtonComponent";
import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import {
  greyColor,
  smallFontSize,
  smallPadding,
  verySmallPadding,
} from "../../../../helper/constant";
import NumberInputComponent from "../input/numberInputComponent/NumberInputComponent";
import MenuComponent from "../menu/MenuComponent";

const currencies = [
  { id: 0, name: "€" },
  { id: 1, name: "$" },
];

function LabeledBudgetInputComponent(props) {
  const [budgets, setBudgets] = useState(props.budgets);
  const { t } = useTranslation();

  function handleAddOrRemoveBudget(index) {
    const tempBudgets = Array.from(budgets);
    if (index === budgets.length - 1) {
      tempBudgets.push({
        budgetTitle: "",
        budgetValue: "",
        budgetCurrency: "€",
      });
    } else {
      tempBudgets.splice(index, 1);
    }
    setBudgets(tempBudgets);
    props.onChange(tempBudgets);
  }

  function handleBudgetTitleChange(budgetTitle, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetTitle = budgetTitle;
    setBudgets(tempBudgets);
    props.onChange(tempBudgets);
  }

  function handleBudgetValueChange(budgetValue, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetValue = budgetValue;
    setBudgets(tempBudgets);
    props.onChange(tempBudgets);
  }

  function handleBudgetCurrencyChange(budgetCurrency, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetCurrency = budgetCurrency;
    setBudgets(tempBudgets);
    props.onChange(tempBudgets);
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
          Amount
        </Text>
      </HStack>
      {budgets.map((budget, index) => {
        return (
          <HStack key={index} paddingBottom={smallPadding}>
            <Box>
              <InputComponent
                value={budget.budgetTitle}
                placeholder={t("mapping.canvas.form.budget.title.placeholder")}
                onChange={(budgetTitle) =>
                  handleBudgetTitleChange(budgetTitle, index)
                }
              />
            </Box>

            <Box w="100%" paddingX={smallPadding}>
              <NumberInputComponent
                value={budget.budgetValue}
                placeholder={t("mapping.canvas.form.budget.value.placeholder")}
                onChange={(budgetValue) =>
                  handleBudgetValueChange(budgetValue, index)
                }
              />
            </Box>
            <MenuComponent
              item={budget.budgetCurrency}
              items={currencies}
              onChange={(budgetCurrency) =>
                handleBudgetCurrencyChange(budgetCurrency, index)
              }
            />
            <Box w="30px" h="30px" paddingLeft={smallPadding}>
              <IconButtonComponent
                height="30px"
                width="15px"
                onClick={() => handleAddOrRemoveBudget(index)}
                icon={
                  index === budgets.length - 1 ? (
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
