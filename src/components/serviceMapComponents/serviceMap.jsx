import React from "react";
import "./App.css";
import DragDrop from "./drag-drop/view/DragDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const ServiceMap = ({data=[], reloadServices}) => {
  
  return (
    <div className='h-100'>
      <DndProvider backend={HTML5Backend}>
        {
          <DragDrop reloadServices={reloadServices} data={data} />
        }
      </DndProvider>
    </div>
  );
};

export { ServiceMap };
