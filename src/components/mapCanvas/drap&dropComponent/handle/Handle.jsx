import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const HandleContainer = styled.div`
  left: ${({ percent }) => percent}%;
  position: absolute;
  margin-left: ${(props) => (props.isFirst ? "-2.5px" : "-2.5px")};
  z-index: 2;
  width: 5px;
  height: 100%;
  cursor: e-resize;
`;

function Handle(props) {
  const { getHandleProps, handle, isFirst } = props;
  return (
    <HandleContainer
      {...getHandleProps(handle.id)}
      percent={handle.percent}
      isFirst={isFirst}
    />
  );
}

Handle.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  getHandleProps: PropTypes.func.isRequired,
  handle: PropTypes.object.isRequired,
};

export default Handle;
