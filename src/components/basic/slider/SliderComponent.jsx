import React from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import Tick from "./sliderComponents/ticks/Tick";
import SmallTick from "./sliderComponents/ticks/SmallTick";
import NameTick from "./sliderComponents/ticks/NameTick";
import Track from "./sliderComponents/Track";
import Handle from "./sliderComponents/Handle";

const marginTop = 12.5;

const sliderStyle = {
  // Give the slider some width
  position: "relative",
  width: "100%",
  height: 25,
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 2.5,
  zIndex: 1,
  marginTop: marginTop,
  borderRadius: "40px",
  backgroundColor: "#AAAAAA",
};

function SliderComponent(props) {
  const { servicePhaseRange } = props;
  const smallTicks = [
    -5 / 3,
    -4 / 3,
    -2 / 3,
    -1 / 3,
    1 / 3,
    2 / 3,
    4 / 3,
    5 / 3,
    7 / 3,
    8 / 3,
    10 / 3,
    11 / 3,
  ];

  const ticks = [-2, -1, 0, 1, 2, 3, 4];

  const namesTicks = [-1.5, -0.5, 0.5, 1.5, 2.5, 3.5];

  return (
    <Box marginTop={10}>
      <Slider
        rootStyle={sliderStyle}
        domain={[-2, 4]}
        step={1 / 3}
        mode={2}
        values={[servicePhaseRange.startPhase, servicePhaseRange.endPhase]}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks }) => (
            <div>
              {tracks.map(({ id, source, target }) => {
                // Each change we assign the value to the temporary variables to update in the onSlideEnd
                servicePhaseRange.startPhase = source.value;
                servicePhaseRange.endPhase = target.value;

                return <Track key={id} source={source} target={target} />;
              })}
            </div>
          )}
        </Tracks>
        <Ticks values={ticks}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick, index) => (
                <Tick
                  key={tick.id}
                  tick={tick}
                  index={index}
                  phase={[
                    servicePhaseRange.startPhase,
                    servicePhaseRange.endPhase,
                  ]}
                />
              ))}
            </div>
          )}
        </Ticks>
        <Ticks values={smallTicks}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <SmallTick
                  key={tick.id}
                  tick={tick}
                  phase={[
                    servicePhaseRange.startPhase,
                    servicePhaseRange.endPhase,
                  ]}
                />
              ))}
            </div>
          )}
        </Ticks>
        <Ticks values={namesTicks}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick, index) => (
                <NameTick key={tick.id} tick={tick} index={index} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </Box>
  );
}

SliderComponent.propTypes = {
  servicePhaseRange: PropTypes.object.isRequired,
};

export default SliderComponent;
