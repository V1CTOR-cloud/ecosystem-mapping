import React,{useState} from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components";
const sliderStyle = {
  position: "relative",
  width: "100%",
};

const PhaseRange = ({ low = 1, high = 2 ,returnData, type, hideRailticks, bg, name, serviceStatus, onClick}) => {
  const domain = [-2, 3];
  const defaultValues = [low, high];
  const [availResize, setavailResize] = useState(false)
  const handleRangeChange=(e)=>{
    
    returnData(
             {low:parseFloat(e[0].toFixed(1)),
             high:parseFloat(e[1].toFixed(1), 10)}
           )
  }
  return (
    <Slider
      mode={2}
      step={1 / 3}
      disabled={type==="show"}
      domain={domain}
      rootStyle={sliderStyle}
      values={defaultValues}
      onSlideEnd={(e)=>handleRangeChange(e)}
    >
      { hideRailticks ? null :
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
      }
     { hideRailticks ? 
     <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles" onMouseEnter={()=>setavailResize(true)}>
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
                hideRailticks={hideRailticks}
              />
            ))}
          </div>
        )}
      </Handles>
       :
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
        }
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div onMouseEnter={()=>setavailResize(false)}>
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={ availResize ? getTrackProps : ()=>{}}
                hideRailticks={hideRailticks}
                bg={bg}
                name={name}
                serviceStatus={serviceStatus}
                availResize={availResize}
                onClick={onClick}
              />
            ))}
          </div>
        )}
      </Tracks>
      { hideRailticks ? null :
      <Ticks count={5}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick key={tick.id} tick={tick} count={ticks.length} />
            ))}
          </div>
        )}
      </Ticks>
      }
    </Slider>
  );
};

export { PhaseRange };
