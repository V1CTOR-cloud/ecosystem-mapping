import React from "react";
import { Tag, TagLabel } from "@chakra-ui/react";

class SuggestedTags extends React.Component {
  render(Tags) {

    const tags=[];
    return (
      <div>
        {tags.map((result) => (
          <Tag bg="white" pl="0">
            <TagLabel className="tag-lbl">{result}</TagLabel>
          </Tag>
        ))}
      </div>
    );
  }
}
export default SuggestedTags;
