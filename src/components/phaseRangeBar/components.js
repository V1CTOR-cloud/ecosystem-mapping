import React, { Fragment } from "react";
import PropTypes from "prop-types";
import imgDraft from "../../assets/images/dr.png";

const railOuterStyle = {
  position: "absolute",
  width: "100%",
  height: 42,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  cursor: "pointer",
};

const railInnerStyle = {
  position: "absolute",
  width: "100%",
  height: 10,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  pointerEvents: "none",
  backgroundCcolor: "rgb(255 255 255)",
  border: "1px solid black",
};

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
  hideRailticks,
}) {
  return (
    <Fragment>
      <div
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: "pointer",
          //border: "1px solid white",
          backgroundColor: "none",
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          width: 15,
          height: 15,
          borderRadius: "50%",
          boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
          border: "2px solid #0E5E81",
          backgroundColor: disabled ? "#666" : "#ffffff",
          opacity: hideRailticks ? 0 : null,
        }}
      />
    </Fragment>
  );
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Handle.defaultProps = {
  disabled: false,
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export function KeyboardHandle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: "50%",
        boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
        backgroundColor: disabled ? "#666" : "#ffc400",
      }}
      {...getHandleProps(id)}
    />
  );
}

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

KeyboardHandle.defaultProps = {
  disabled: false,
};

export function Track({
  source,
  target,
  getTrackProps,
  disabled,
  hideRailticks,
  bg,
  name,
  availResize,
  serviceStatus,
  onClick,
}) {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        height: hideRailticks ? 35 : 10,
        zIndex: 1,
        backgroundColor: bg ? bg : "#0E5E81",
        borderRadius: 7,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
      onClick={onClick}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {name}
        </span>
        {serviceStatus === "Draft" ? (
          <img
            style={{
              width: "30px",
              marginLeft: "5px",
            }}
            alt="draft"
            src={imgDraft}
          />
        ) : null}
      </div>
    </div>
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Track.defaultProps = {
  disabled: false,
};

export function Tick({ tick, count, format }) {
  return (
    <div>
      {tick.percent < 100 && tick.percent > 0 && (
        <div
          style={{
            position: "absolute",
            marginTop: 14,
            width: 1,
            backgroundColor: "rgb(200,200,200)",
            left: `${tick.percent - 0.2}%`,
            borderLeft: "3px solid #0E5E81",
            height: "34px",
            top: "-31px",
          }}
        />
      )}

      {tick.percent < 100 && (
        <>
          <div
            style={{
              position: "absolute",
              marginTop: 14,
              width: 1,
              backgroundColor: "rgb(200,200,200)",
              left: `${tick.percent + 6.5}%`,
              borderLeft: "2px solid #0E5E81",
              height: "24px",
              top: "-25.9px",
            }}
          />
          <div
            style={{
              position: "absolute",
              marginTop: 14,
              width: 1,
              backgroundColor: "rgb(200,200,200)",
              left: `${tick.percent + 13.2}%`,
              borderLeft: "2px solid #0E5E81",
              height: "24px",
              top: "-25.9px",
            }}
          />{" "}
        </>
      )}

      <div
        style={{
          position: "absolute",
          marginTop: 22,
          fontFamily: "Ubuntu",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "14px",
          lineHeight: "140%",
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
};

Tick.defaultProps = {
  format: (d) => d,
};
