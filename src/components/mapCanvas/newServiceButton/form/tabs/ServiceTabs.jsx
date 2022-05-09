import React, { useContext } from "react";

import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import LabeledMenu from "../../../../basic/inputs/menu/LabeledMenu";
import LabelWithTooltip from "../../../../basic/labelWithTooltip/LabelWithTooltip";
import ButtonComponent from "../../../../basic/Buttons/ButtonComponent";
import SliderComponent from "../../../../basic/slider/SliderComponent";
import LabeledDatePickerComponent from "../../../../basic/inputs/date/LabeledDatePickerComponent";
import LabeledInputComponent from "../../../../basic/inputs/input/inputComponent/LabeledInputComponent";
import {
  blueColor,
  greyColor,
  greyTextColor,
  mediumPadding,
  smallFontSize,
  smallPadding,
  verySmallPadding,
} from "../../../../../helper/constant";
import LabeledBudgetInputComponent from "../../../../basic/inputs/budget/LabeledBudgetInputComponent";
import LabeledMultilineInputComponent from "../../../../basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import MenuComponent from "../../../../basic/inputs/menu/MenuComponent";
import { MapContext } from "../../../../../pages/MapCanvasPage";

function ServiceTabs(props) {
  const [formValues, setFormValues] = useContext(MapContext);
  const { t } = useTranslation();

  return (
    <Tabs marginTop={mediumPadding}>
      <TabList>
        <Tab>
          <Text>Details</Text>
        </Tab>
        <Tab>
          <Text>Availability</Text>
        </Tab>
        <Tab>
          <Text>Details</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LabeledMenu
            label={t("mapping.canvas.form.owner.organisation")}
            tooltipText={t("mapping.canvas.form.owner.organisation.tooltip")}
            tooltipAriaLabel={t("mapping.canvas.form.owner.organisation")}
            item={formValues["ownerOrganisation"]}
            items={props.organisations}
            onClick={(ownerOrganisation) =>
              setFormValues(
                ownerOrganisation,
                "ownerOrganisation",
                "classicOnChange"
              )
            }
          />
          <Box marginTop={smallPadding}>
            <LabelWithTooltip
              label={t("mapping.canvas.form.application.type")}
              tooltipAriaLabel={t("mapping.canvas.form.application.type")}
              tooltipText={t("mapping.canvas.form.application.type.tooltip")}
            />
            <HStack marginTop={verySmallPadding}>
              {props.applicationTypeButtons.map((buttonText) => {
                return (
                  <Box key={buttonText}>
                    <ButtonComponent
                      padding={`0 0 0 ${verySmallPadding}`}
                      isWithoutBorder={true}
                      buttonText={buttonText}
                      color={
                        formValues["applicationType"] === buttonText
                          ? blueColor
                          : greyTextColor
                      }
                      isSelected={formValues["applicationType"] === buttonText}
                      onClick={() =>
                        setFormValues(
                          buttonText,
                          "applicationType",
                          "classicOnChange"
                        )
                      }
                    />
                  </Box>
                );
              })}
            </HStack>
          </Box>
          <Box marginTop={mediumPadding}>
            <LabelWithTooltip
              label={t("mapping.canvas.form.phase")}
              tooltipAriaLabel={t("mapping.canvas.form.phase")}
              tooltipText={t("mapping.canvas.form.phase.tooltip")}
            />
            <SliderComponent phase={formValues["phase"]} />
          </Box>

          {/*TODO tags component to think about later on*/}
          {/*<Box marginTop={smallPadding}>*/}
          {/*  <LabelWithTooltip*/}
          {/*    label="Tags"*/}
          {/*    tooltipAriaLabel="tags"*/}
          {/*    tooltipText="bla bla"*/}
          {/*  />*/}
          {/*  <TagComponent*/}
          {/*    tags={tags}*/}
          {/*    handleTagsChange={(tag) => handleTagsChange(tag)}*/}
          {/*  />*/}
          {/*</Box>*/}
        </TabPanel>
        <TabPanel>
          <LabeledDatePickerComponent
            tooltipText={t("mapping.canvas.form.date.tooltip")}
            label={t("mapping.canvas.form.date")}
            tooltipAriaLabel={t("mapping.canvas.form.date")}
            serviceStartTime={formValues["serviceStartTime"]}
            serviceEndTime={formValues["serviceEndTime"]}
            handleServiceStartTimeChange={(value) =>
              setFormValues(value, "serviceStartTime", "classicOnChange")
            }
            handleServiceEndTimeChange={(value) =>
              setFormValues(value, "serviceEndTime", "classicOnChange")
            }
          />
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText={t("mapping.canvas.form.link.tooltip")}
              label={t("mapping.canvas.form.link")}
              tooltipAriaLabel={t("mapping.canvas.form.link")}
              placeholder={t("mapping.canvas.form.link.placeholder")}
              value={formValues["link"]}
              handleOnChange={(event) =>
                setFormValues(event.target.value, "link", "classicOnChange")
              }
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText={t("mapping.canvas.form.location.tooltip")}
              label={t("mapping.canvas.form.location")}
              tooltipAriaLabel={t("mapping.canvas.form.location")}
              placeholder={t("mapping.canvas.form.location.placeholder")}
              value={formValues["location"]}
              handleOnChange={(event) =>
                setFormValues(event.target.value, "location", "classicOnChange")
              }
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledMenu
              tooltipText={t("mapping.canvas.form.audience.tooltip")}
              label={t("mapping.canvas.form.audience")}
              tooltipAriaLabel={t("mapping.canvas.form.audience")}
              item={formValues["audience"]}
              items={props.audiences}
              onClick={(audience) =>
                setFormValues(audience, "audience", "classicOnChange")
              }
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledBudgetInputComponent
              label={t("mapping.canvas.form.budget")}
              tooltipText={t("mapping.canvas.form.budget.tooltip")}
              tooltipAriaLabel={t("mapping.canvas.form.budget")}
              budgets={formValues["budgets"]}
              handleBudgetNameChange={(event, index) => {
                return setFormValues(
                  event.target.value,
                  "budgets",
                  "budgetNameChange",
                  index
                );
              }}
              handleBudgetValueChange={(event, index) =>
                setFormValues(
                  event.target.value,
                  "budgets",
                  "budgetValueChange",
                  index
                )
              }
              handleAddBudget={() => setFormValues("", "budgets", "addBudget")}
              handleRemoveBudget={(index) =>
                setFormValues("", "budgets", "removeBudget", index)
              }
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <LabeledMultilineInputComponent
            tooltipText={t("mapping.canvas.form.description.tooltip")}
            label={t("mapping.canvas.form.description")}
            tooltipAriaLabel={t("mapping.canvas.form.description")}
            placeholder={t("mapping.canvas.form.description.placeholder")}
            value={formValues["description"]}
            handleOnChange={(event) =>
              setFormValues(
                event.target.value,
                "description",
                "classicOnChange"
              )
            }
          />
          <Box paddingTop={smallPadding}>
            <LabeledMultilineInputComponent
              tooltipText={t("mapping.canvas.form.outcomes.tooltip")}
              label={t("mapping.canvas.form.outcomes")}
              tooltipAriaLabel={t("mapping.canvas.form.outcomes")}
              placeholder={t("mapping.canvas.form.outcomes.placeholder")}
              value={formValues["outcomes"]}
              handleOnChange={(event) =>
                setFormValues(event.target.value, "outcomes", "classicOnChange")
              }
            />
          </Box>
          {props.services.length >= 2 ? (
            <Box paddingTop={smallPadding}>
              <LabelWithTooltip
                tooltipText={t("mapping.canvas.form.related.services.tooltip")}
                label={t("mapping.canvas.form.related.services")}
                tooltipAriaLabel={t("mapping.canvas.form.related.services")}
              />
              <HStack>
                <Text
                  w="calc(100% / 2)"
                  paddingBottom={verySmallPadding}
                  color={greyColor}
                  fontSize={smallFontSize}
                >
                  {t("mapping.canvas.form.related.services.previous")}
                </Text>
                <Text
                  w="calc(100% / 2)"
                  paddingLeft={verySmallPadding}
                  paddingBottom={verySmallPadding}
                  color={greyColor}
                  fontSize={smallFontSize}
                >
                  {t("mapping.canvas.form.related.services.following")}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={formValues["precededService"]}
                    items={props.services}
                    onClick={(value) =>
                      setFormValues(value, "precededService", "classicOnChange")
                    }
                  />
                </Box>
                <Box w={smallPadding} />
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={formValues["followedService"]}
                    items={props.services}
                    onClick={(value) =>
                      setFormValues(value, "followedService", "classicOnChange")
                    }
                  />
                </Box>
              </HStack>
            </Box>
          ) : (
            <Box />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default React.memo(ServiceTabs);
