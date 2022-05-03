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

function ServiceTabs(props) {
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
            label="Owner Organization"
            tooltipText="bla bla bla"
            tooltipAriaLabel="Owner Organization"
            item={props.ownerOrganisation}
            items={props.organisations}
            onClick={(ownerOrganisation) =>
              props.handleOwnerOrganisationChange(ownerOrganisation)
            }
          />
          <Box marginTop={smallPadding}>
            <LabelWithTooltip
              label="Application Type"
              tooltipAriaLabel="Application Type"
              tooltipText="bla bla"
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
                        props.applicationType === buttonText
                          ? blueColor
                          : greyTextColor
                      }
                      isSelected={props.applicationType === buttonText}
                      onClick={() =>
                        props.handleApplicationTypeChange(buttonText)
                      }
                    />
                  </Box>
                );
              })}
            </HStack>
          </Box>
          <Box marginTop={mediumPadding}>
            <LabelWithTooltip
              label="Phases"
              tooltipAriaLabel="Phases"
              tooltipText="bla bla"
            />
            <SliderComponent phase={props.phase} />
          </Box>

          {/*TODO tags component to think about later on, working but without autocomplete and suggestion*/}
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
            tooltipText="blabla"
            label="Time"
            tooltipAriaLabel="Time"
            serviceStartTime={props.serviceStartTime}
            serviceEndTime={props.serviceEndTime}
            handleServiceStartTimeChange={props.handleServiceStartTimeChange}
            handleServiceEndTimeChange={props.handleServiceEndTimeChange}
          />
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText="blabla"
              label="Link"
              tooltipAriaLabel="Link"
              placeholder="https://example.com/servicelink"
              value={props.link}
              handleOnChange={props.handleLinkChange}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledInputComponent
              tooltipText="blabla"
              label="Location"
              tooltipAriaLabel="Location"
              placeholder="Location Address"
              value={props.location}
              handleOnChange={props.handleLocationChange}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledMenu
              tooltipText="blabla"
              label="Audience"
              tooltipAriaLabel="Audience"
              item={props.audience}
              items={props.audiences}
              onClick={(audience) => props.handleAudienceChange(audience)}
            />
          </Box>
          <Box marginTop={mediumPadding}>
            <LabeledBudgetInputComponent
              label="Budget"
              tooltipText="blablba"
              tooltipAriaLabel="Budget"
              budgets={props.budgets}
              handleBudgetNameChange={props.handleBudgetNameChange}
              handleBudgetValueChange={props.handleBudgetValueChange}
              handleAddBudget={props.handleAddBudget}
              handleRemoveBudget={props.handleRemoveBudget}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <LabeledMultilineInputComponent
            tooltipText="blabla"
            label="Description"
            tooltipAriaLabel="Description"
            placeholder="Description of your service"
            value={props.description}
            handleOnChange={props.handleDescriptionChange}
          />
          <Box paddingTop={smallPadding}>
            <LabeledMultilineInputComponent
              tooltipText="blabla"
              label="Outcomes"
              tooltipAriaLabel="Outcomes"
              placeholder="The outcomes of your service"
              value={props.outcomes}
              handleOnChange={props.handleOutcomesChange}
            />
          </Box>
          {props.services.length >= 2 ? (
            <Box paddingTop={smallPadding}>
              <LabelWithTooltip
                tooltipText="blabla"
                label="Related Services"
                tooltipAriaLabel="Related Services"
              />
              <HStack>
                <Text
                  w="calc(100% / 2)"
                  paddingBottom={verySmallPadding}
                  color={greyColor}
                  fontSize={smallFontSize}
                >
                  Precedes Service
                </Text>
                <Text
                  w="calc(100% / 2)"
                  paddingLeft={verySmallPadding}
                  paddingBottom={verySmallPadding}
                  color={greyColor}
                  fontSize={smallFontSize}
                >
                  Followed Service
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={props.precededService}
                    items={props.services}
                    onClick={props.handlePrecededServiceChange}
                  />
                </Box>
                <Box w={smallPadding} />
                <Box w="calc(100% / 2)">
                  <MenuComponent
                    width="100%"
                    item={props.followedService}
                    items={props.services}
                    onClick={props.handleFollowedServiceChange}
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
