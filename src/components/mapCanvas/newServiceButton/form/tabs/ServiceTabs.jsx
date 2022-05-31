import React from "react";

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
import SliderComponent from "../../../../basic/slider/SliderComponent";
import {
  greyColor,
  mediumPadding,
  smallFontSize,
  smallPadding,
  verySmallPadding,
} from "../../../../../helper/constant";
import ApplicationTypeComponent from "../applicationType/ApplicationTypeComponent";
import LabeledDatePickerComponent from "../../../../basic/inputs/date/LabeledDatePickerComponent";
import LabeledInputComponent from "../../../../basic/inputs/input/inputComponent/LabeledInputComponent";
import LabeledBudgetInputComponent from "../../../../basic/inputs/budget/LabeledBudgetInputComponent";
import LabeledMultilineInputComponent from "../../../../basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import MenuComponent from "../../../../basic/inputs/menu/MenuComponent";
import LocationComponent from "../../../../basic/location/LocationComponent";

function ServiceTabs(props) {
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
            item={props.formValue["ownerOrganisation"]}
            items={props.organisations}
            onChange={(organisation) => {
              props.formValue["ownerOrganisation"] = organisation;
            }}
          />
          <ApplicationTypeComponent
            applicationType={props.formValue["applicationType"]}
            applicationTypeButtons={props.applicationTypeButtons}
            onChange={(applicationType) =>
              (props.formValue["applicationType"] = applicationType)
            }
          />
          <Box marginTop={mediumPadding}>
            <LabelWithTooltip
              label={t("mapping.canvas.form.phase")}
              tooltipAriaLabel={t("mapping.canvas.form.phase")}
              tooltipText={t("mapping.canvas.form.phase.tooltip")}
            />
            <SliderComponent phase={props.formValue["phases"]} />
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
            serviceStartTime={props.formValue["serviceStartTime"]}
            serviceEndTime={props.formValue["serviceEndTime"]}
            onChangeStartTime={(value) =>
              (props.formValue["serviceStartTime"] = value)
            }
            onChangeEndTime={(value) =>
              (props.formValue["serviceEndTime"] = value)
            }
          />
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText={t("mapping.canvas.form.link.tooltip")}
              label={t("mapping.canvas.form.link")}
              tooltipAriaLabel={t("mapping.canvas.form.link")}
              placeholder={t("mapping.canvas.form.link.placeholder")}
              value={props.formValue["serviceLink"]}
              onChange={(link) => (props.formValue["serviceLink"] = link)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LocationComponent
              value={props.formValue["serviceLocation"]}
              locations={props.locations}
              onChange={(location) =>
                (props.formValue["serviceLocation"] = location)
              }
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledMenu
              tooltipText={t("mapping.canvas.form.audience.tooltip")}
              label={t("mapping.canvas.form.audience")}
              tooltipAriaLabel={t("mapping.canvas.form.audience")}
              item={props.formValue["audience"]}
              items={props.audiences}
              onChange={(audience) => (props.formValue["audience"] = audience)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledBudgetInputComponent
              label={t("mapping.canvas.form.budget")}
              tooltipText={t("mapping.canvas.form.budget.tooltip")}
              tooltipAriaLabel={t("mapping.canvas.form.budget")}
              budgets={props.formValue["serviceBudget"]}
              onChange={(budgets) =>
                (props.formValue["serviceBudget"] = budgets)
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
            value={props.formValue["serviceDescription"]}
            onChange={(description) =>
              (props.formValue["serviceDescription"] = description)
            }
          />
          <Box paddingTop={smallPadding}>
            <LabeledMultilineInputComponent
              tooltipText={t("mapping.canvas.form.outcomes.tooltip")}
              label={t("mapping.canvas.form.outcomes")}
              tooltipAriaLabel={t("mapping.canvas.form.outcomes")}
              placeholder={t("mapping.canvas.form.outcomes.placeholder")}
              value={props.formValue["serviceOutcomes"]}
              onChange={(outcomes) =>
                (props.formValue["serviceOutcomes"] = outcomes)
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
                    item={props.formValue["precededService"]}
                    items={props.services}
                    onChange={(value) =>
                      (props.formValue["precededService"] = value)
                    }
                  />
                </Box>
                <Box w={smallPadding} />
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={props.formValue["followedService"]}
                    items={props.services}
                    onChange={(value) =>
                      (props.formValue["followedService"] = value)
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
