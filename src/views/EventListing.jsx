import React, { useState, useEffect } from "react";
import { EventListingComponent } from "../components/core-components/EventListingComponent";
import { LogoandTitle } from "../components/reusable-components/LogoAndTitleComponent";
import { SearchBar } from "../components/reusable-components/SearchBar";
import { Logo } from "assets/helper/constants";
import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_QUERY, SEARCH_LOCATION_QUERY, INFO } from "views/Queries";
import Service from "service/CommonService"
import "../assets/fonts/Fonts.css";

export const EventListing = ({
  data,
  error,
  getVal,
  cancelModal_fall_back,
}) => {
  const [sendData, setSendData] = useState("");
  const [flowData, setflowData] = useState(null);
  const [switchdata, setswitchdata] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    setflowData(data);
  }, [data]);
  // *******************************************************

  const { loading } = useQuery(
    switchdata === "location"
      ? SEARCH_LOCATION_QUERY
      : switchdata === "keyword"
      ? SEARCH_QUERY
      : INFO,
    {
      variables: { value: sendData },
      onCompleted: (data) => {
        setflowData(data);
      },
    }
  );

  // *******************************************************
  const GetKeyWordValue = (val) => {
    setswitchdata("keyword");
    setSendData(val);
  };
  const GetLocationValue = (val) => {
    setswitchdata("location");
    setSendData(val);
  };
  // *******************************************************
  const widthValue = (val) => {
    setWidth(val);
  };

  const cancelModal_fall = (s) => {
    cancelModal_fall_back(s);
  };
// *********************************************************

const RefreshData=s=>
{
  Service.getData().then(s=>{setflowData(s)})
}
  return (
    <div>
      {flowData && (
        <Box>
          <Flex className=" logo-and-title-margin d-flex pos-rel">
            <LogoandTitle src={Logo} title={"Startup Events"} />
            <SearchBar
              GetKeyWordValue={(val) => {
                GetKeyWordValue(val);
              }}
              GetLocationValue={(val) => {
                GetLocationValue(val);
              }}
              width={width}
            />
          </Flex>
          {!loading && (
            <EventListingComponent
              getRes={(s) => {
                RefreshData()
              }}
              cancelModal_fall={(s) => {
                cancelModal_fall(s);
              }}
              getVal={getVal}
              data={flowData}
              widthValue={(val) => {
                widthValue(val);
              }}
            />
          )}
        </Box>
      )}
      {loading && <h2>Loading....</h2>}
      {error && <h2>Error....</h2>}
    </div>
  );
};
