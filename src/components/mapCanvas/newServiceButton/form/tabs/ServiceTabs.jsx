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
import PropTypes from "prop-types";

import LabeledMenu from "../../../../basic/inputs/menu/LabeledMenu";
import LabelWithTooltip from "../../../../basic/labelWithTooltip/LabelWithTooltip";
import SliderComponent from "../../../../basic/slider/SliderComponent";
import ApplicationTypeComponent from "../applicationType/ApplicationTypeComponent";
import LabeledDatePickerComponent from "../../../../basic/inputs/date/LabeledDatePickerComponent";
import LabeledInputComponent from "../../../../basic/inputs/input/inputComponent/LabeledInputComponent";
import LabeledBudgetInputComponent from "../../../../basic/inputs/budget/LabeledBudgetInputComponent";
import LabeledMultilineInputComponent from "../../../../basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import MenuComponent from "../../../../basic/inputs/menu/MenuComponent";
import { CanvasProvider } from "../../../../../pages/MapCanvasPage";
import { AppProvider } from "../../../../../App";
import UniqueLocationPicker from "../../../../basic/picker/locationPicker/UniqueLocationPicker";

function ServiceTabs(props) {
  const {
    formValue,
    applicationTypeButtons,
    audiences,
    organisations,
    locationsList,
  } = props;
  const { t } = useTranslation();
  const canvasProvider = useContext(CanvasProvider);
  const appProvider = useContext(AppProvider);

  return (
    <Tabs marginTop={6}>
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
            initialValue={formValue.ownerOrganization}
            items={organisations}
            onChange={(organisation) => {
              formValue.ownerOrganization = organisation;
            }}
          />
          <ApplicationTypeComponent
            applicationType={formValue.serviceApplication}
            applicationTypeButtons={applicationTypeButtons}
            onChange={(applicationType) =>
              (formValue.serviceApplication = applicationType)
            }
          />
          <Box marginTop={6}>
            <LabelWithTooltip
              label={t("mapping.canvas.form.phase")}
              tooltipAriaLabel={t("mapping.canvas.form.phase")}
              tooltipText={t("mapping.canvas.form.phase.tooltip")}
            />
            <SliderComponent servicePhaseRange={formValue.servicePhaseRange} />
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
            serviceStartTime={formValue.serviceTime.startTime}
            serviceEndTime={formValue.serviceTime.endTime}
            onChangeStartTime={(value) =>
              (formValue.serviceTime.startTime = value)
            }
            onChangeEndTime={(value) => (formValue.serviceTime.endTime = value)}
          />
          <Box marginTop={6}>
            <LabeledInputComponent
              tooltipText={t("mapping.canvas.form.link.tooltip")}
              label={t("mapping.canvas.form.link")}
              tooltipAriaLabel={t("mapping.canvas.form.link")}
              placeholder={t("mapping.canvas.form.link.placeholder")}
              initialValue={formValue.serviceLink}
              onChange={(link) => (formValue.serviceLink = link)}
            />
          </Box>
          <Box marginTop={6}>
            <UniqueLocationPicker
              initialValues={formValue.serviceLocation}
              onChange={(value) => (formValue.serviceLocation = value)}
              locationsList={
                appProvider.locations ? appProvider.locations : locationsList
              }
            />
          </Box>
          <Box marginTop={6}>
            <LabeledMenu
              tooltipText={t("mapping.canvas.form.audience.tooltip")}
              label={t("mapping.canvas.form.audience")}
              tooltipAriaLabel={t("mapping.canvas.form.audience")}
              initialValue={formValue.serviceAudience}
              items={audiences}
              onChange={(audience) => (formValue.serviceAudience = audience)}
            />
          </Box>
          <Box marginTop={6}>
            <LabeledBudgetInputComponent
              label={t("mapping.canvas.form.budget")}
              tooltipText={t("mapping.canvas.form.budget.tooltip")}
              tooltipAriaLabel={t("mapping.canvas.form.budget")}
              initialBudgets={formValue.serviceBudget}
              onChange={(budgets) => (formValue.serviceBudget = budgets)}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <LabeledMultilineInputComponent
            tooltipText={t("mapping.canvas.form.description.tooltip")}
            label={t("mapping.canvas.form.description")}
            tooltipAriaLabel={t("mapping.canvas.form.description")}
            placeholder={t("mapping.canvas.form.description.placeholder")}
            initialValue={formValue.serviceDescription}
            onChange={(description) =>
              (formValue.serviceDescription = description)
            }
          />
          <Box paddingTop={3}>
            <LabeledMultilineInputComponent
              tooltipText={t("mapping.canvas.form.outcomes.tooltip")}
              label={t("mapping.canvas.form.outcomes")}
              tooltipAriaLabel={t("mapping.canvas.form.outcomes")}
              placeholder={t("mapping.canvas.form.outcomes.placeholder")}
              initialValue={formValue.serviceOutcomes}
              onChange={(outcomes) => (formValue.serviceOutcomes = outcomes)}
            />
          </Box>
          {canvasProvider.services.length >= 2 ? (
            <Box paddingTop={3}>
              <LabelWithTooltip
                tooltipText={t("mapping.canvas.form.related.services.tooltip")}
                label={t("mapping.canvas.form.related.services")}
                tooltipAriaLabel={t("mapping.canvas.form.related.services")}
              />
              <HStack>
                <Text
                  w="calc(100% / 2)"
                  paddingBottom={2}
                  color={"blackAlpha.700"}
                  fontSize={"xs"}
                >
                  {t("mapping.canvas.form.related.services.previous")}
                </Text>
                <Text
                  w="calc(100% / 2)"
                  paddingLeft={2}
                  paddingBottom={2}
                  color={"blackAlpha.700"}
                  fontSize={"xs"}
                >
                  {t("mapping.canvas.form.related.services.following")}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    initialValue={formValue.precededService}
                    items={canvasProvider.services}
                    onChange={(value) => (formValue.precededService = value)}
                  />
                </Box>
                <Box w={3} />
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    initialValue={formValue.followedService}
                    items={canvasProvider.services}
                    onChange={(value) => (formValue.followedService = value)}
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
  /**
   * Mainly for storybook, this argument allow to pass a list of locations in the case that the appProvider was not passed.
   */
  locationsList: PropTypes.array,
  formValue: PropTypes.object.isRequired,
  applicationTypeButtons: PropTypes.array.isRequired,
  audiences: PropTypes.array.isRequired,
  organisations: PropTypes.array.isRequired,
};

export default ServiceTabs;
