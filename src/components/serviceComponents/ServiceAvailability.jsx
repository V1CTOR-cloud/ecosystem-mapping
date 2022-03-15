import React from "react";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  ModalBody,
  HStack,
  Grid,
  Box,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import SelectDate from "components/microComponents/SelectDate";
import SelectTime from "components/microComponents/SelectTime";
import { LocationMap } from "./LocationMap";
import { Stack } from "@chakra-ui/react";
import TimezoneComponent from "components/microComponents/TimeZoneComponenet";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
//import { MultiInput } from "components/microComponents/MultiStackInput";

const ServiceAvailability = ({
  ServiceAvailabilityData,
  dataS = { serviceName: "" },
  isEdit,
}) => {
  const { t } = useTranslation();
  const [online, setOnline] = useState(false);
  const [venue, setVenue] = useState(false);
  const [serviceStartDate, setServiceStartDate] = useState(new Date());
  const [serviceEndDate, setServiceEndDate] = useState(new Date());
  const [serviceStartTime, setServiceStartTime] = useState(
    new Date().getHours().toString() + ":" + new Date().getMinutes()
  );
  const [serviceEndTime, setServiceEndTime] = useState(
    new Date().getHours().toString() + ":" + new Date().getMinutes()
  );
  //const [multiInput, setMultiInput] = useState([]);
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [serviceLocation, setServiceLocation] = useState("");
  const [val, setVal] = useState("");

  // console.log(
  //   serviceStartDate +
  //     "-" +
  //     serviceEndDate +
  //     "-" +
  //     serviceStartTime +
  //     "-" +
  //     serviceEndTime +
  //     "-" +
  //     timeZone +
  //     "-" +
  //     online +
  //     "-" +
  //     venue +
  //     "-" +
  //     JSON.stringify(multiInput)
  // );
  useEffect(() => {
    if (isEdit) {
      setServiceStartDate(dataS.serviceStartTime);
      setServiceStartTime(dataS.serviceStartTime);
      setServiceEndDate(dataS.serviceEndTime);
      setServiceEndTime(dataS.serviceEndTime);
      setTimeZone(dataS.timezone);
      setOnline(dataS.onlineService);
      setVenue(dataS.offlineSerivce);
      setServiceLocation(dataS.serviceLocation);
      if (dataS.onlineService) setVal("Online");
      if (dataS.offlineSerivce) setVal("Venue");
      //setMultiInput(dataS.multi);
    }
  }, [dataS, isEdit]);
  useMemo(() => {
    ServiceAvailabilityData({
      startDate: serviceStartDate,
      endDate: serviceEndDate,
      startTime: serviceStartTime,
      endTime: serviceEndTime,
      timezone: timeZone,
      online: online,
      venue: venue,
      serviceLocation: serviceLocation,
      //multiInput: multiInput,
    });
  }, [
    serviceStartDate,
    serviceEndDate,
    serviceStartTime,
    serviceEndTime,
    timeZone,
    online,
    venue,
    serviceLocation,
    //multiInput,
    ServiceAvailabilityData,
  ]);
  const handleChange = (e) => {
    setVal(e);
    if (e === "Online") {
      setOnline(true);
      setVenue(false);
    }
    if (e === "Venue") {
      setVenue(true);
      setOnline(false);
    }
  };
  return (
    <ModalBody pb={6}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gridRow="1"
        gap={10}
        mt="2"
      >
        <Box>
          <FormControl>
            <FormLabel className="frm-lbl">
              {t("startup.popup.service.details.content.service.starts")}
            </FormLabel>
            <SelectDate
              IsEdit={isEdit}
              date={serviceStartDate}
              getDate={(e) => {
                setServiceStartDate(e);
                // ServiceAvailabilityData({
                //   startDate: e,
                //   endDate: serviceEndDate,
                //   startTime: serviceStartTime,
                //   endTime: serviceEndTime,
                //   timezone: timeZone,
                //   online: online,
                //   venue: venue,
                //   multiInput: multiInput,
                // });
              }}
              className="fm-ip-flds"
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel className="frm-lbl">
              {t("startup.popup.service.details.content.start.time")}
            </FormLabel>
            <SelectTime
              getTime={(e) => {
                setServiceStartTime(e);
                // ServiceAvailabilityData({
                //   startDate: serviceStartDate,
                //   endDate: serviceEndDate,
                //   startTime: e,
                //   endTime: serviceEndTime,
                //   timezone: timeZone,
                //   online: online,
                //   venue: venue,
                //   multiInput: multiInput,
                // });
              }}
              className="fm-ip-flds"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel className="frm-lbl">
              {t("startup.popup.service.details.content.service.ends")}
            </FormLabel>
            {/* <SelectDate
              IsEdit={isEdit}
              enddateval={serviceEndDate}
              getDate={(e) => {
                setServiceEndDate(e);
                // ServiceAvailabilityData({
                //   startDate: serviceStartDate,
                //   endDate: e,
                //   startTime: serviceStartTime,
                //   endTime: serviceEndTime,
                //   timezone: timeZone,
                //   online: online,
                //   venue: venue,
                //   multiInput: multiInput,
                // });
              }}
              validationdate={serviceStartDate}
              className="fm-ip-flds"
            /> */}

            <SelectDate
              IsEdit={isEdit}
              date={serviceEndDate}
              getDate={(e) => {
                setServiceEndDate(e);
                // ServiceAvailabilityData({
                //   startDate: serviceStartDate,
                //   endDate: e,
                //   startTime: serviceStartTime,
                //   endTime: serviceEndTime,
                //   timezone: timeZone,
                //   online: online,
                //   venue: venue,
                //   multiInput: multiInput,
                // });
              }}
              validationDate={serviceStartDate}
              className="fm-ip-flds"
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel className="frm-lbl">
              {t("startup.popup.service.details.content.end.time")}
            </FormLabel>
            <SelectTime
              getTime={(e) => {
                setServiceEndTime(e);
                // ServiceAvailabilityData({
                //   startDate: serviceStartDate,
                //   endDate: serviceEndDate,
                //   startTime: serviceStartTime,
                //   endTime: e,
                //   timezone: timeZone,
                //   online: online,
                //   venue: venue,
                //   multiInput: multiInput,
                // });
              }}
              validationtime={serviceStartTime}
              className="fm-ip-flds"
            />
          </FormControl>
        </Box>
      </Grid>

      <FormControl>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.details.content.timezone")}
        </FormLabel>
        {/* <LocationDropdown className="fm-ip-flds" /> */}
        <TimezoneComponent
          data={dataS && dataS.timezone ? dataS.timezone : timeZone}
          getTimeZone={(e) => {
            setTimeZone(e);
            // ServiceAvailabilityData({
            //   startDate: serviceStartDate,
            //   endDate: serviceEndDate,
            //   startTime: serviceStartTime,
            //   endTime: serviceEndTime,
            //   timezone: e,
            //   online: online,
            //   venue: venue,
            //   multiInput: multiInput,
            // });
          }}
          className="fm-ip-flds"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.filter.location")}
        </FormLabel>
        <HStack spacing={10} display="grid" direction="row">
          <Stack className="d-grid" direction="row">
            <Box display="inline-flex" className="pd-radio">
              <RadioGroup
                value={val}
                onChange={(e) => {
                  handleChange(e);
                }}
                w="100%"
              >
                <Box pb="10px">
                  <Flex>
                    <Radio value="Online">
                      {t("startup.popup.service.details.content.online")}
                    </Radio>
                    <Box ml="30px" w="70%">
                      {val === "Online" && (
                        <Input
                          placeholder="Enter URL"
                          className="fm-ip-flds"
                          size="sm"
                          type="url"
                          value={serviceLocation}
                          onChange={(data) =>
                            setServiceLocation(data.target.value)
                          }
                        />
                      )}
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Radio value="Venue">
                      {t("startup.popup.service.details.content.venue")}
                    </Radio>
                    <Box ml="30px" w="70%">
                      {val === "Venue" && (
                        <Input
                          placeholder="Enter Venue"
                          className="fm-ip-flds"
                          size="sm"
                          type="text"
                          value={serviceLocation}
                          onChange={(data) =>
                            setServiceLocation(data.target.value)
                          }
                        />
                      )}
                    </Box>
                  </Flex>
                </Box>
              </RadioGroup>

              {/* <Checkbox
                onChange={() => {
                  setOnline(!online);
                  // ServiceAvailabilityData({
                  //   startDate: serviceStartDate,
                  //   endDate: serviceEndDate,
                  //   startTime: serviceStartTime,
                  //   endTime: serviceEndTime,
                  //   timezone: timeZone,
                  //   online: !online,
                  //   venue: venue,
                  //   multiInput: multiInput,
                  // });
                }}
                value="1"
              >
                Online
              </Checkbox>
              <Box ml="10px" w="40%">
                {online && (
                  <Input
                    placeholder="Enter URL"
                    className="fm-ip-flds"
                    size="sm"
                    type='url'
                    onChange={(data) => setServiceLocation( data.target.value )}
                  />
                )}
              </Box>
            </Box>
            <Box display="inline-flex">
              <Box>
                <Checkbox
                  onChange={() => {
                    setVenue(!venue);
                    // ServiceAvailabilityData({
                    //   startDate: serviceStartDate,
                    //   endDate: serviceEndDate,
                    //   startTime: serviceStartTime,
                    //   endTime: serviceEndTime,
                    //   timezone: timeZone,
                    //   online: online,
                    //   venue: !venue,
                    //   multiInput: multiInput,
                    // });
                  }}
                  value="2"
                >
                  Venue
                </Checkbox>
              </Box>
              <Box ml="12px" w="50%">
                {venue && (
                  <Input
                    placeholder="Enter Venue"
                    className="fm-ip-flds"
                    size="sm"
                    onChange={(data) => setServiceLocation( data.target.value )}
                      // ServiceAvailabilityData({
                      //   startDate: serviceStartDate,
                      //   endDate: serviceEndDate,
                      //   startTime: serviceStartTime,
                      //   endTime: serviceEndTime,
                      //   timezone: timeZone,
                      //   online: online,
                      //   venue: venue,
                      //   multiInput: e,
                      // });
                  />
                )}
              </Box> */}
            </Box>
          </Stack>
        </HStack>
      </FormControl>
      <LocationMap />
    </ModalBody>
  );
};

export { ServiceAvailability };
