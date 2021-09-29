import React from "react";
import { Accordion } from "@chakra-ui/react";
import "components/Component.css";
import { AccordianItemComponent } from "./AccordianItemComponent";
import { AccordianMobileItemComponent } from "./AccordianMobileItemComponent";
export const AccordianPanelComponent = ({ data, width,getRes }) => {
  return (
    <div>
      {width >= 550 ? (
        <Accordion allowToggle className="card-margin">
          {data &&
            data.eventProfiles.map((post, i) => {
              return (
                <div key={i}>
                  <AccordianItemComponent getRes={s=>{getRes(s)}} data={post} width={width} />
                </div>
              );
            })}
        </Accordion>
      ) : (
        <div>
          <Accordion allowToggle className="card-margin">
            {data &&
              data.eventProfiles.map((post, i) => {
                return (
                  <div key={i}>
                    <AccordianMobileItemComponent data={post} width={width} />
                  </div>
                );
              })}
          </Accordion>
        </div>
      )}
    </div>
  );
};
