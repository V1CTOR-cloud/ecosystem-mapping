import React, { useEffect, useState } from "react";

import TagsInput from "react-tagsinput";
import { Box, Flex, HStack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import Services from "service/EcosystemMapServices";
import "react-tagsinput/react-tagsinput.css";

const TagElement = ({ commentData, dataS, isEdit }) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);
  const [uniqueTagsArray, setUniqueTagsArray] = useState([]);

  useEffect(() => {
    const uniqueTags = [];
    Services.getAllTags().then((res) => {
      res.forEach((element) => {
        element.tagTitle.forEach((element) => {
          if (!uniqueTags.includes(element)) {
            uniqueTags.push(element);
          }
        });
      });
      setUniqueTagsArray(uniqueTags);
    });
    if (isEdit) {
      setTags(dataS.tagTitle);
    }
  }, [dataS, isEdit]);

  const handleTagChange = (tags) => {
    setTags(tags);
    commentData({
      tags: tags,
    });
  };

  return (
    <div className="tag-div">
      <Flex>
        <Box w="100%">
          <TagsInput
            value={tags}
            onChange={(tags) => handleTagChange(tags)}
            onlyUnique
            addOnPaste
          />
        </Box>
      </Flex>
      <Text className="sug-tag" mt="24px">
        {t("startup.popup.service.content.service.suggested.tags")}
      </Text>
      <HStack spacing={0}>
        <Box>
          {uniqueTagsArray.map((result) => (
            <Tag bg="white" pl="0">
              <TagLabel className="tag-lbl">{result}</TagLabel>
            </Tag>
          ))}
        </Box>
      </HStack>
    </div>
  );
};

export default TagElement;
