import React from "react";

import styled from "styled-components";

const HandleContainer = styled.div`
  left: ${(props) => props.percent}%;
  position: absolute;
  margin-left: ${(props) => (props.isFirst ? "-2.5px" : "-2.5px")};
  z-index: 2;
  width: 5px;
  height: 100%;
  cursor: e-resize;
`;

function Handle(props) {
  return (
    <HandleContainer
      {...props.getHandleProps(props.handle.id)}
      percent={props.handle.percent}
      isFirst={props.isFirst}
    />
  );
}

export default Handle;
