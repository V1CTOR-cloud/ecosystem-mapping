import React from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components";
const sliderStyle = {
  position: "relative",
  width: "100%",
};

const PhaseRange = ({ low = -2, high = 3,block,getValuesFromBar }) => {
  const domain = [-2, 3];
  const defaultValues = [low, high];
  return (
    <Slider
      mode={2}
      disabled={block?true:false}
      step={1 / 3}
      domain={domain}
      rootStyle={sliderStyle}
      onChange={(e) =>
        // getValuesFromBar(parseFloat(e[0].toFixed(1)),
        // parseFloat(e[1].toFixed(1), 10))
        getValuesFromBar([
          parseFloat(e[0].toFixed(1)),
          parseFloat(e[1].toFixed(1), 10),
        ])
      }
      values={defaultValues}
    >
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
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
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div>
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
      <Ticks count={5}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick key={tick.id} tick={tick} count={ticks.length} />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  );
};

export { PhaseRange };
