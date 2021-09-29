import React, { useEffect, useState } from "react";

import {
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  AccordionItem,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import "components/Component.css";
import { Flex } from "@chakra-ui/react";

import moment from "moment";

import {
  EventImage,
  RegisterButton,
  SDPComponent,
} from "components/reusable-components";

export const AccordianMobileItemComponent = ({ data }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let d = moment(data.startDateTime).format("ddd, MMM Do |  hh:mm a");

    setDate(d);
  }, [data.startDateTime]);
  return (
    <AccordionItem className="extra-border box-shadow p-15 ">
      <AccordionButton className="svg-size">
        <AccordionIcon />
      </AccordionButton>

      <Box flex="1" textAlign="left">
        <Grid className="grid-item" templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem className="margin-auto mr-15">
            <EventImage data={data} mobile={true} />
          </GridItem>

          <GridItem className="min-content-date-name" colStart={2} colEnd={13}>
            <Text className="event-name ellipse-text lh-17 pad-eventname-mobile">
              {data.eventTitle}
            </Text>
            {data.eventOrganiser !== null && (
              <Text className="event-loc ">
                @{data.eventLocation.city}, by{" "}
                {data.eventOrganiser.eventorganiserName}
              </Text>
            )}

            <Box className="gap-in-two-div">
              <HStack>
                <Text className="date-time ">
                  <b>{date}</b>
                </Text>
              </HStack>
            </Box>
          </GridItem>
        </Grid>
        <Flex>
          <Box flex="1">
            <SDPComponent range={{ 1: -2, 2: -2 }} />
          </Box>
          <Box>
            <RegisterButton mobile={true} link={data.eventUrl} />
          </Box>
        </Flex>

        <div></div>
      </Box>

      <AccordionPanel>
        <Text fontSize="md" align="left">
          {data.eventDescription}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
};
