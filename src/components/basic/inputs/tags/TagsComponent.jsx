import React from "react";

import TagsInput from "react-tagsinput";
import tagsComponentStyle from "./tagsComponent.css";

function TagComponent(props) {
  function handleTagsChange(tag) {
    props.handleTagsChange(tag);
  }

  return (
    <div className={tagsComponentStyle}>
      <TagsInput
        value={props.tags}
        onChange={(tag) => handleTagsChange(tag)}
        onlyUnique
        addOnPaste
      />
    </div>
  );
}

export default TagComponent;
