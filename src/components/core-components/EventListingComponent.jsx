import React, { useEffect, useLayoutEffect, useState } from "react";
import { AccordianPanelComponent } from "./AccordianPanelComponent";
import AddEditEvent from "components/add-edit-event/AddEditEvent";
export const EventListingComponent = ({
  data,
  widthValue,
  getVal,
  cancelModal_fall,
  getRes
}) => {
  
  const [width, height] = useWindowSize();
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  useEffect(() => {
    widthValue(width);
  }, [width, widthValue]);

  const cancelModal = (s) => {
    cancelModal_fall(s);
    getRes(true)
  };
  return (
    <div>
      {getVal && (
        <AddEditEvent
          cancelModal={(s) => {
            cancelModal(s);
          }}
        />
      )}

      <AccordianPanelComponent getRes={s=>{getRes(s)}} data={data} width={width} height={height} />
    </div>
  );
};
