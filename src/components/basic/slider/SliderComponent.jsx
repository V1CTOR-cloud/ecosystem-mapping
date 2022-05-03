import React from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Box } from "@chakra-ui/react";

import {
  blueColor,
  blueHoverColor,
  borderRadius,
  defaultFontSize,
  defaultPadding,
  greyColor,
  greyTextColor,
} from "../../../helper/constant";

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
  borderRadius: borderRadius,
  backgroundColor: greyColor,
};

function SliderComponent(props) {
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
    <Box marginTop={defaultPadding}>
      <Slider
        rootStyle={sliderStyle}
        domain={[-2, 4]}
        step={1 / 3}
        mode={2}
        values={[-1, 1]}
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
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => {
                // Each change we assign the value to the temporary variables to update in the onSlideEnd
                props.phase[0] = source.value;
                props.phase[1] = target.value;

                return (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    handlePhaseChange={props.handlePhaseChange}
                  />
                );
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
                  count={ticks.length}
                  index={index}
                  phase={props.phase}
                />
              ))}
            </div>
          )}
        </Ticks>
        <Ticks values={smallTicks}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick, index) => (
                <SmallTick
                  key={tick.id}
                  tick={tick}
                  count={ticks.length}
                  index={index}
                  phase={props.phase}
                />
              ))}
            </div>
          )}
        </Ticks>
        <Ticks values={namesTicks}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick, index) => (
                <NameTick
                  key={tick.id}
                  tick={tick}
                  count={ticks.length}
                  index={index}
                />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </Box>
  );
}

function Handle(props) {
  return (
    <div
      style={{
        left: `${props.handle.percent}%`,
        position: "absolute",
        zIndex: 3,
        marginTop: 6,
        marginLeft: -7.5,
        width: 15,
        height: 15,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: blueColor,
      }}
      {...props.getHandleProps(props.handle.id)}
    />
  );
}

function Track(props) {
  return (
    <div
      style={{
        position: "absolute",
        height: 2.5,
        marginTop: marginTop,
        zIndex: 2,
        backgroundColor: blueHoverColor,
        borderRadius: borderRadius,
        cursor: "pointer",
        left: `${props.source.percent}%`,
        width: `${props.target.percent - props.source.percent}%`,
      }}
    />
  );
}

function Tick(props) {
  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          marginLeft: props.index === 0 ? 1 : props.index === 6 ? -1 : -0.5,
          width: 1,
          height: 20,
          marginTop: -5,
          borderRight: "dotted 2px",
          borderColor:
            props.tick.value > props.phase[0] &&
            props.tick.value < props.phase[1]
              ? blueHoverColor
              : greyColor,
          left: `${props.tick.percent}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          marginLeft: props.index === 0 ? 1 : props.index === 6 ? -1 : -0.5,
          width: 10,
          height: 10,
          backgroundColor:
            props.tick.value > props.phase[0] &&
            props.tick.value < props.phase[1]
              ? blueHoverColor
              : greyColor,
          rotate: "45deg",
          translate: "-4px 8px",
          left: `${props.tick.percent}%`,
        }}
      />
    </React.Fragment>
  );
}

function SmallTick(props) {
  return (
    <div
      style={{
        position: "absolute",
        marginLeft: -0.5,
        width: 5,
        height: 5,
        backgroundColor:
          props.tick.value > props.phase[0] && props.tick.value < props.phase[1]
            ? blueHoverColor
            : greyColor,
        rotate: "45deg",
        translate: "-4px 11px",
        left: `${props.tick.percent}%`,
      }}
    />
  );
}

function NameTick(props) {
  let phaseName;

  switch (props.index) {
    case 0:
      phaseName = "Ideating";
      break;
    case 1:
      phaseName = "Concepting";
      break;
    case 2:
      phaseName = "Committing";
      break;
    case 3:
      phaseName = "Validating";
      break;
    case 4:
      phaseName = "Scaling";
      break;
    default:
      phaseName = "Establishing";
      break;
  }

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          marginTop: -30,
          marginLeft: props.index === 4 || props.index === 0 ? -17.5 : -25,
          fontSize: 10,
          color: greyTextColor,
          fontFamily: "Ubuntu, sans serif",
          left: `${props.tick.percent}%`,
        }}
      >
        {phaseName}
      </div>
      {props.index !== 6 ? (
        <div
          style={{
            position: "absolute",
            fontSize: defaultFontSize,
            color: greyTextColor,
            fontFamily: "Ubuntu, sans serif",
            marginTop: -15,
            textAlign: "center",
            marginLeft: `${-(100 / props.count) / 2}%`,
            width: `${100 / props.count}%`,
            left: `${props.tick.percent}%`,
          }}
        >
          {props.tick.value - 0.5}
        </div>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}

export default SliderComponent;
