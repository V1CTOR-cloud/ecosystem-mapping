import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

const MultiInput = ({getMultiValue}) => {
  const { t } = useTranslation();
  const [inputList, setInputList] = useState([{ venue: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    getMultiValue(inputList)
  };

  const handleAddClick = () => {
    setInputList([...inputList, { venue: "" }]);
    getMultiValue(inputList)
  };

  return (
    <Box>
      {inputList.map((x, i) => {
        return (
          <Box key={i} mr="10px" mb="10px" style={{ display: "flex" }}>
            <Input
              placeholder="Address where service is provided"
              name="venue"
              value={x.venue}
              onChange={(e) => handleInputChange(e, i)}
              className="fm-ip-flds"
              size="sm"
            />

            {inputList.length !== 1 && (
              <Button size="sm" ml="10px" onClick={() => handleRemoveClick(i)}>
                X
              </Button>
            )}
            {inputList.length - 1 === i && (
              <Button size="sm" ml="10px" onClick={handleAddClick}>
                {t('startup.popup.service.content.add.button')}
              </Button>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export { MultiInput };
