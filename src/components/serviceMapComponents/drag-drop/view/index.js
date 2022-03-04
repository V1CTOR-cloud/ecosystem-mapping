import { useEffect, useState } from "react";
import DragDrop from "./DragDrop";
export const DND = (({ items = [] }) => {

  const [count, setCount] = useState(items);
  useEffect(() => {
    

    setCount(items)
  }, [items])
  return (
    <div className='h-100'>
      <div className='h-100' style={{ overflow: "", clear: "both" }}>
        {count.length > 0 &&
          <DragDrop data={count} />
        }
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
      </div>
    </div>
  );
});
