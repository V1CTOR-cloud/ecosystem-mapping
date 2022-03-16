import React, {useEffect, useState} from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
  Box,
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

function AddOrganisation({setData, orgCreated}) {
  const {t} = useTranslation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [orgName, setOrgName] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [startRange, setStartRange] = useState("0");
  const [endRange, setEndRange] = useState("0");
  const [type, setType] = useState("");

  const Stages = [-2, -1, 0, 1, 2, 3];
  const Type = ["Government", "Mix", "Private", "NGO", "OtherPublic"];

  useEffect(() => {
    if (orgCreated === true) {
    }
  }, [orgCreated, onOpen, onClose]);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setData({
      orgName: orgName,
      orgUrl: orgUrl,
      startRange: startRange,
      endRange: endRange,
      type: type,
    });
  };

  return (
      <>
        <Button onClick={onOpen} background="whatsapp.200" ml="10px">
          {t("startup.popup.service.content.add.button")}
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose(true);
            }}
        >
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Add Organisation</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <form onSubmit={(e) => handleDetailsSubmit(e)}>
                <Input
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Organisation Name"
                />
                <Box mt="10px"/>
                <Select
                    onChange={(e) => setStartRange(e.target.value)}
                    placeholder="Select Start Range"
                >
                  {Stages.map((i, j) => {
                    return (
                        <option key={j} value={i}>
                          {i}
                        </option>
                    );
                  })}
                </Select>
                <Box mt="10px"/>
                <Select
                    onChange={(e) => setEndRange(e.target.value)}
                    placeholder="Select End Range"
                >
                  {Stages.map((i, j) => {
                    return (
                        <option key={j} value={i}>
                          {i}
                        </option>
                    );
                  })}
                </Select>
                <Box mt="10px"/>
                <Select
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Select Type"
                >
                  {Type.map((i, j) => {
                    return (
                        <option key={j} value={i}>
                          {i}
                        </option>
                    );
                  })}
                </Select>
                <Box mt="10px"/>
                <Input
                    onChange={(e) => setOrgUrl(e.target.value)}
                    type="url"
                    placeholder="Private URL"
                />
                <Box mt="10px"/>
                <Box>
                  <Button m="10px" float="right" type="submit" colorScheme="blue">
                    Save
                  </Button>
                </Box>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}

export default AddOrganisation;
