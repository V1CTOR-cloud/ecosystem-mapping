import React, { useState } from "react";

import { Handles, Rail, Slider, Ticks, Tracks } from "react-compound-slider";

import { Handle, SliderRail, Tick, Track } from "./components";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const PhaseRange = ({
  low = 1,
  high = 2,
  returnData,
  type,
  hideRailTicks,
  bg,
  name,
  serviceStatus,
  onClick,
}) => {
  const domain = [-2, 3];
  const defaultValues = [low, high];
  const [resizeAvailable, setResizeAvailable] = useState(false);

  const handleRangeChange = (e) => {
    returnData({
      low: parseFloat(e[0].toFixed(1)),
      high: parseFloat(e[1].toFixed(1)),
    });
  };

  return (
    <Slider
      mode={2}
      step={1 / 3}
      disabled={type === "show"}
      domain={domain}
      rootStyle={sliderStyle}
      values={defaultValues}
      onSlideEnd={(e) => handleRangeChange(e)}
    >
      {hideRailTicks ? null : (
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
      )}
      {hideRailTicks ? (
        <Handles>
          {({ handles, getHandleProps }) => (
            <div
              className="slider-handles"
              onMouseEnter={() => setResizeAvailable(true)}
            >
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                  hideRailticks={hideRailTicks}
                />
              ))}
            </div>
          )}
        </Handles>
      ) : (
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
      )}
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div onMouseEnter={() => setResizeAvailable(false)}>
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={resizeAvailable ? getTrackProps : () => {}}
                hideRailticks={hideRailTicks}
                bg={bg}
                name={name}
                serviceStatus={serviceStatus}
                availResize={resizeAvailable}
                onClick={onClick}
              />
            ))}
          </div>
        )}
      </Tracks>
      {hideRailTicks ? null : (
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      )}
    </Slider>
  );
};

export default PhaseRange;
