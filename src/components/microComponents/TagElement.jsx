import React, { useState} from "react";
import { useEffect } from "react";
import TagsInput from "react-tagsinput";
import { Box, Flex, Text, HStack, Tag, TagLabel} from "@chakra-ui/react"
import "react-tagsinput/react-tagsinput.css"; 
import Services from "service/EcosystemMapServices";
import { useTranslation } from "react-i18next";
//import SuggestedTags from "components/serviceComponents/SuggestedTags";

const App = ({commentdata, dataS, isEdit}) => {
  const {t} = useTranslation();
  const [tags, setTags] = useState([]);
  const [uniqueTagsArray, setuniqueTagsArray] = useState([])
  useEffect(() => {
    const uniqueTags = [];
    Services.getAllTags().then((res)=>{
      res.forEach(element => {
        element.tagTitle.forEach(element => {
          if(!uniqueTags.includes(element)){
            uniqueTags.push(element)
          }
         });
      });
      setuniqueTagsArray(uniqueTags)
    })
    if(isEdit){
      setTags(dataS.tagTitle)
    }
  }, [dataS, isEdit])

  const handleTagChange=(tags)=>{
    setTags(tags)
    commentdata({
      tags: tags,
    });
  }
  return (
    <div className="tag-div">
      <Flex>
        <Box w="100%">
        <TagsInput value={tags} onChange={(tags)=>handleTagChange(tags)} onlyUnique addOnPaste/>
        </Box>
        </Flex>
        <Text className="sug-tag" mt="24px">
          {t('startup.popup.service.content.service.suggested.tags')}
        </Text>
        <HStack spacing={0}>
          <Box>
        {uniqueTagsArray.map((result) =>
         (
          <Tag bg="white" pl="0">
            <TagLabel className="tag-lbl">{result}</TagLabel>
          </Tag>
        ))}
      </Box>
        </HStack>
    </div>
  );
};

export { App };
