import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  ModalBody,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SelectDate from "components/microComponents/SelectDate";
import SelectTime from "components/microComponents/SelectTime";
import LocationMap from "./LocationMap";
import TimezoneComponent from "components/microComponents/TimeZoneComponenet";

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
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [serviceLocation, setServiceLocation] = useState("");
  const [val, setVal] = useState("");

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
            <SelectDate
              IsEdit={isEdit}
              date={serviceEndDate}
              getDate={(e) => {
                setServiceEndDate(e);
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
        <TimezoneComponent
          data={dataS && dataS.timezone ? dataS.timezone : timeZone}
          getTimeZone={(e) => {
            setTimeZone(e);
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
            </Box>
          </Stack>
        </HStack>
      </FormControl>
      <LocationMap />
    </ModalBody>
  );
};

export default ServiceAvailability;
