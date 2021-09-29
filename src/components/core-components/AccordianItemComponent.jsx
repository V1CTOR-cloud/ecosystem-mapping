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
import moment from "moment";
import {
  EventDate,
  EventImage,
  RegisterButton,
  SDPComponent,
} from "components/reusable-components";
import SDPConverter from "components/converter-sdp/ConverterSDP";
import { EditModal } from "components/add-edit-event/EditModal";
export const AccordianItemComponent = ({ data, getRes }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let d = moment(data.startDateTime).format("ddd, MMM Do |  hh:mm a");

    setDate(d);
  }, [data.startDateTime]);
  const getValSDP = (data) => {
    if (data.fromPhaseAutomated !== null) {
      return SDPConverter.getPoint(data.fromPhaseAutomated);
    } else if (data.fromPhaseManual !== null) {
      return SDPConverter.getPoint(data.fromPhaseManual);
    } else {
      return 0;
    }
  };
  const getVal2SDP = (data) => {
    if (data.toPhaseAutomated !== null) {
      return SDPConverter.getPoint(data.toPhaseAutomated);
    } else if (data.toPhaseManual !== null) {
      return SDPConverter.getPoint(data.toPhaseManual);
    } else {
      return 0;
    }
  };
  return (
    <AccordionItem className="extra-border box-shadow  p-15 ">
      <AccordionButton className="svg-size">
        <AccordionIcon />
      </AccordionButton>
      <Box flex="1" textAlign="left">
        <Grid className="" templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem className="margin-auto mr-15">
            <EventDate data={data} />
            <EventImage data={data} />
          </GridItem>
          <GridItem colStart={2} colEnd={13}>
            <Text
              title={data.eventTitle}
              className="event-name ellipse-text p-r-38"
            >
              {data.eventTitle}
              {/* <Button style={{float:'right'}} className="edit-btn">Edit</Button> */}
              <EditModal
                getRes={(s) => {
                  getRes(s);
                }}
                data={data}
              />
            </Text>

            <Text className="event-loc ellipse-text">
              @{data.eventLocation.city}
              {/* , by{" "} */}
              {/* {data.eventOrganiser.eventorganiserName} */}
            </Text>
            <Box className="gap-in-two-div">
              <HStack>
                <Text className="date-time ellipse-text w-100">{date}</Text>
                <RegisterButton link={data.eventUrl} />
              </HStack>
            </Box>
          </GridItem>
        </Grid>
        <SDPComponent from={getValSDP(data)} to={getVal2SDP(data) } />
      </Box>
      <AccordionPanel className="card-desc">
        <Text fontSize="md" align="left">
          {data.eventDescription}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
};
