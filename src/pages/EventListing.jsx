import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";
import { EventListing } from "views/EventListing";
import { AddEventComponent } from "components/reusable-components/AddEventButton";
const Event = () => {
  const [val, setVal] = useState(false);
  const passVal = (s) => {
    if (s === true) {
      window.scrollTo(0, 120);
    }
    setVal(s);
  };
  const cancelModal_fall_back = (s) => {
    setVal(s);
  };
  return (
    <div>
      <Grid minH="100vh">
        {val !== undefined && (
          <EventListing
            cancelModal_fall_back={(s) => {
              cancelModal_fall_back(s);
            }}
            getVal={val}
          />
        )}
        <AddEventComponent passValModal={val} passVal={(s) => passVal(s)} />
      </Grid>
    </div>
  );
};
export { Event };
