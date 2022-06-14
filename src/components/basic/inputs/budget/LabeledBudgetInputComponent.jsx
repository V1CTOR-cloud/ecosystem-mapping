import React, { useState } from "react";

import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import InputComponent from "../input/inputComponent/InputComponent";
import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import NumberInputComponent from "../input/numberInputComponent/NumberInputComponent";
import MenuComponent from "../menu/MenuComponent";

const currencies = [
  { id: 0, name: "€" },
  { id: 1, name: "$" },
];

function LabeledBudgetInputComponent(props) {
  const { propsBudgets, onChange, label, tooltipText, tooltipAriaLabel } =
    props;
  const [budgets, setBudgets] = useState(propsBudgets);
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
    onChange(tempBudgets);
  }

  function handleBudgetTitleChange(budgetTitle, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetTitle = budgetTitle;
    setBudgets(tempBudgets);
    onChange(tempBudgets);
  }

  function handleBudgetValueChange(budgetValue, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetValue = budgetValue;
    setBudgets(tempBudgets);
    onChange(tempBudgets);
  }

  function handleBudgetCurrencyChange(budgetCurrency, index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets[index].budgetCurrency = budgetCurrency;
    setBudgets(tempBudgets);
    onChange(tempBudgets);
  }

  return (
    <React.Fragment>
      <LabelWithTooltip
        label={label}
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
      />

      <HStack>
        <Text
          w="150px"
          paddingBottom={2}
          color={"blackAlpha.700"}
          fontSize={"xs"}
        >
          Description
        </Text>
        <Text
          paddingLeft={3}
          paddingBottom={2}
          color={"blackAlpha.700"}
          fontSize={"xs"}
        >
          Amount
        </Text>
      </HStack>
      {budgets.map((budget, index) => {
        return (
          <HStack key={index} paddingBottom={3}>
            <Box>
              <InputComponent
                initialValue={budget.budgetTitle}
                placeholder={t("mapping.canvas.form.budget.title.placeholder")}
                onChange={(budgetTitle) =>
                  handleBudgetTitleChange(budgetTitle, index)
                }
              />
            </Box>

            <Box w="100%" paddingX={3}>
              <NumberInputComponent
                initialValue={budget.budgetValue.toString()}
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
            <Box w="30px" paddingLeft={3}>
              <IconButton
                variant="ghost"
                aria-label={tooltipAriaLabel}
                onClick={() => handleAddOrRemoveBudget(index)}
                icon={
                  index === budgets.length - 1 ? (
                    <AddIcon color={"blackAlpha.700"} />
                  ) : (
                    <CloseIcon color={"blackAlpha.700"} />
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

LabeledBudgetInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
  propsBudgets: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LabeledBudgetInputComponent);
