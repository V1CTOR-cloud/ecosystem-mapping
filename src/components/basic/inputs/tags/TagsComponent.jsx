import React from "react";

import TagsInput from "react-tagsinput";
import tagsComponentStyle from "./tagsComponent.css";
import PropTypes from "prop-types";

function TagComponent(props) {
  const { propHandleTagsChange, tags } = props;

  function handleTagsChange(tag) {
    propHandleTagsChange(tag);
  }

  return (
    <div className={tagsComponentStyle}>
      <TagsInput
        value={tags}
        onChange={(tag) => handleTagsChange(tag)}
        onlyUnique
        addOnPaste
      />
    </div>
  );
}

TagComponent.propTypes = {
  tags: PropTypes.array.isRequired,
  propHandleTagsChange: PropTypes.func.isRequired,
};

export default TagComponent;
