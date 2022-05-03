import React from "react";

import styled from "styled-components";
import { Handles, Slider, Tracks } from "react-compound-slider";
import { Draggable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";

import Handle from "../handle/Handle";
import { borderRadius, smallPadding } from "../../../../helper/constant";
import ServiceName from "./ServiceName";
import {
  replaceNumberToPhase,
  replacePhaseToNumber,
} from "../../../../service/phaseConverter";
import Services from "../../../../service/EcosystemMapServices";
import toastComponent from "../../../basic/ToastComponent";
import { useTranslation } from "react-i18next";

const ServiceLineContainer = styled.div`
  margin-bottom: ${smallPadding};
  display: flex;
  height: 30px;
  width: 100%;
  border-radius: ${borderRadius};
`;

const sliderStyle = {
  position: "relative",
  width: "100%",
  height: 30,
};

function ServiceContainer(props) {
  const { t } = useTranslation();

  let sourceValue = replacePhaseToNumber(props.service.fromPhase);
  let targetValue = replacePhaseToNumber(props.service.toPhase);

  async function handleSlideEnd(sourceValue, targetValue) {
    // Update the model everytime we resize it.
    props.service.fromPhase = replaceNumberToPhase(sourceValue);
    props.service.toPhase = replaceNumberToPhase(targetValue);

    const dataToUpdate = {
      id: props.service.id,
      fromPhase: props.service.fromPhase,
      toPhase: props.service.toPhase,
    };

    const res = await Services.updateRangesPhase(dataToUpdate).catch((e) => [
      "Error",
      e,
    ]);

    // Display toast to show to the user that either they were a problem or it was updated.
    if (res[0] === "Error") {
      toastComponent(t("mapping.toast.error"), "error");
    } else {
      toastComponent(t("mapping.toast.success.service"), "success");
    }
  }

  return (
    <Draggable draggableId={props.service.id} index={props.index}>
      {(provided) => (
        <ServiceLineContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Slider
            rootStyle={sliderStyle}
            domain={[-2, 4]}
            step={1 / 3}
            values={
              // Convert all the string to numeric value
              [
                replacePhaseToNumber(props.service.fromPhase),
                replacePhaseToNumber(props.service.toPhase),
              ]
            }
            mode={2}
            onSlideEnd={() => handleSlideEnd(sourceValue, targetValue)}
          >
            <Handles>
              {({ handles, getHandleProps }) => (
                <Box>
                  {handles.map((handle, index) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      getHandleProps={getHandleProps}
                      isFirst={index === 0}
                    />
                  ))}
                </Box>
              )}
            </Handles>
            <Tracks right={false} left={false}>
              {({ tracks }) => (
                <Box>
                  {tracks.map(({ id, source, target }) => {
                    // Each change we assign the value to the temporary variables to update in the onSlideEnd
                    sourceValue = source.value;
                    targetValue = target.value;

                    return (
                      <ServiceName
                        key={id}
                        source={source}
                        target={target}
                        provided={provided}
                        service={props.service}
                        handleServiceClick={props.handleServiceClick}
                      />
                    );
                  })}
                </Box>
              )}
            </Tracks>
          </Slider>
        </ServiceLineContainer>
      )}
    </Draggable>
  );
}

export default ServiceContainer;
