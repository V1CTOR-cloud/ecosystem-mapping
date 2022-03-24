import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DragDrop from "./drag-drop/view/DragDrop";
import "./App.css";

const ServiceMap = ({ data = [], reloadServices }) => {
  return (
    <div className="h-100">
      <DndProvider backend={HTML5Backend}>
        {<DragDrop reloadServices={reloadServices} data={data} />}
      </DndProvider>
    </div>
  );
};

export default ServiceMap;
