import React, { useState, useEffect, useMemo } from "react";
import { Grid } from "@chakra-ui/react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import TagElement from "components/microComponents/TagElement";
import { useTranslation } from "react-i18next";

const TagComment = ({ tagData, dataS, isEdit, commentData }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (isEdit) {
      // setComment(dataS.serviceComments)
    }
  }, [dataS, isEdit]);
  useMemo(() => {
    tagData({
      comment: comment,
    });
  }, [comment, tagData]);
  return (
    <Grid templateColumns="repeat(2, 1fr)" gridRow="1" gap={10} mt="48px">
      <FormControl>
        <FormLabel className="tg-cmmt">
          {t("startup.popup.service.content.service.tag")}
        </FormLabel>
        <TagElement
          dataS={dataS}
          isEdit={isEdit} /*tagArray={(data) => {tagArray &&  tagArray(data)}}*/
          commentData={(data) => commentData(data)}
        />
      </FormControl>
      <FormControl>
        <FormLabel className="tg-cmmt">
          {t("startup.popup.service.content.service.additional.comment")}
        </FormLabel>
        <Textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          size="xs"
          className="fm-ip-flds"
          h="148px"
        />
      </FormControl>
    </Grid>
  );
};

export {TagComment};
