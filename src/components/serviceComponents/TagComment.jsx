import React, { useState, useMemo } from "react";

import { FormControl, FormLabel, Textarea, Grid } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import TagElement from "components/microComponents/TagElement";

const TagComment = ({ tagData, dataS, isEdit, commentData }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");

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
          isEdit={isEdit}
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

export default TagComment;
