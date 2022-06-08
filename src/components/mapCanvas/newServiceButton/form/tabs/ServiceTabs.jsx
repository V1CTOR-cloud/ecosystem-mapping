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
import PropTypes from "prop-types";

function ServiceTabs(props) {
  const {
    formValue,
    applicationTypeButtons,
    services,
    audiences,
    organisations,
    locations,
  } = props;
  const { t } = useTranslation();
  return (
    <Tabs marginTop={mediumPadding}>
      <TabList>
        <Tab>
          <Text>{t("mapping.canvas.form.tabs.general")}</Text>
        </Tab>
        <Tab>
          <Text>{t("mapping.canvas.form.tabs.availability")}</Text>
        </Tab>
        <Tab>
          <Text>{t("mapping.canvas.form.tabs.details")}</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LabeledMenu
            label={t("mapping.canvas.form.owner.organisation")}
            tooltipText={t("mapping.canvas.form.owner.organisation.tooltip")}
            tooltipAriaLabel={t("mapping.canvas.form.owner.organisation")}
            item={formValue["ownerOrganisation"]}
            items={organisations}
            onChange={(organisation) => {
              formValue["ownerOrganisation"] = organisation;
            }}
          />
          <ApplicationTypeComponent
            applicationType={formValue["applicationType"]}
            applicationTypeButtons={applicationTypeButtons}
            onChange={(applicationType) =>
              (formValue["applicationType"] = applicationType)
            }
          />
          <Box marginTop={mediumPadding}>
            <LabelWithTooltip
              label={t("mapping.canvas.form.phase")}
              tooltipAriaLabel={t("mapping.canvas.form.phase")}
              tooltipText={t("mapping.canvas.form.phase.tooltip")}
            />
            <SliderComponent
              servicePhaseRange={formValue["servicePhaseRange"]}
            />
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
            serviceStartTime={formValue["serviceStartTime"]}
            serviceEndTime={formValue["serviceEndTime"]}
            onChangeStartTime={(value) =>
              (formValue["serviceStartTime"] = value)
            }
            onChangeEndTime={(value) => (formValue["serviceEndTime"] = value)}
          />
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText={t("mapping.canvas.form.link.tooltip")}
              label={t("mapping.canvas.form.link")}
              tooltipAriaLabel={t("mapping.canvas.form.link")}
              placeholder={t("mapping.canvas.form.link.placeholder")}
              value={formValue["serviceLink"]}
              onChange={(link) => (formValue["serviceLink"] = link)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LocationComponent
              value={formValue["serviceLocation"]}
              locations={locations}
              onChange={(location) => (formValue["serviceLocation"] = location)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledMenu
              tooltipText={t("mapping.canvas.form.audience.tooltip")}
              label={t("mapping.canvas.form.audience")}
              tooltipAriaLabel={t("mapping.canvas.form.audience")}
              item={formValue["serviceAudience"]}
              items={audiences}
              onChange={(audience) => (formValue["serviceAudience"] = audience)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledBudgetInputComponent
              label={t("mapping.canvas.form.budget")}
              tooltipText={t("mapping.canvas.form.budget.tooltip")}
              tooltipAriaLabel={t("mapping.canvas.form.budget")}
              propsBudgets={formValue["serviceBudget"]}
              onChange={(budgets) => (formValue["serviceBudget"] = budgets)}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <LabeledMultilineInputComponent
            tooltipText={t("mapping.canvas.form.description.tooltip")}
            label={t("mapping.canvas.form.description")}
            tooltipAriaLabel={t("mapping.canvas.form.description")}
            placeholder={t("mapping.canvas.form.description.placeholder")}
            value={formValue["serviceDescription"]}
            onChange={(description) =>
              (formValue["serviceDescription"] = description)
            }
          />
          <Box paddingTop={smallPadding}>
            <LabeledMultilineInputComponent
              tooltipText={t("mapping.canvas.form.outcomes.tooltip")}
              label={t("mapping.canvas.form.outcomes")}
              tooltipAriaLabel={t("mapping.canvas.form.outcomes")}
              placeholder={t("mapping.canvas.form.outcomes.placeholder")}
              value={formValue["serviceOutcomes"]}
              onChange={(outcomes) => (formValue["serviceOutcomes"] = outcomes)}
            />
          </Box>
          {services.length >= 2 ? (
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
                    item={formValue["precededService"]}
                    items={services}
                    onChange={(value) => (formValue["precededService"] = value)}
                  />
                </Box>
                <Box w={smallPadding} />
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={formValue["followedService"]}
                    items={services}
                    onChange={(value) => (formValue["followedService"] = value)}
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

ServiceTabs.propTypes = {
  formValue: PropTypes.object.isRequired,
  applicationTypeButtons: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  audiences: PropTypes.array.isRequired,
  organisations: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
};

export default ServiceTabs;

Tab.defaultProps = {
  _focus: { boxShadow: "none" },
};
