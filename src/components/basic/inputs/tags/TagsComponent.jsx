import React from "react";

import TagsInput from "react-tagsinput";
import tagsComponentStyle from "./tagsComponent.css";
import PropTypes from "prop-types";

function TagComponent(props) {
  const { handleTagsChange, tags } = props;
  function handleTagsChange(tag) {
    handleTagsChange(tag);
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
  handleTagsChange: PropTypes.func.isRequired,
};

export default TagComponent;
