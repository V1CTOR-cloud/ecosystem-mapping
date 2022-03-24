import React from "react";

import {
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import imgSource from "../../assets/images/sharp.png";

const ServiceChangesLog = (allComments) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dateFormatter = (date) => {
    try {
      return new Date(date).toUTCString();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link onClick={onOpen}>
        <Text as="u">
          {t("startup.popup.service.details.content.more.details")}
        </Text>
      </Link>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className="md-lg">
          <ModalHeader display="flex" p="0" mb="5px">
            <Flex align="center">
              <Image
                w="24px"
                h="24px"
                onClick={onClose}
                src={imgSource}
                alt="image"
                mr="1"
              />
              {t("startup.popup.comment.table.heading")}
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Table className="tbl-space-row cmn-tbl">
              <Thead className="tbl-log-header">
                <Tr background="#FFFFFF">
                  <Th width="180px">
                    {t("startup.popup.comment.table.column.date.time")}{" "}
                  </Th>
                  <Th width="200px">
                    {t("startup.popup.comment.table.column.modified.by")}
                  </Th>
                  <Th width="220px">
                    {t("startup.popup.comment.table.column.status")}
                  </Th>
                  <Th>{t("startup.popup.comment.table.column.comments")}</Th>
                </Tr>
              </Thead>
              <Tbody className="tbl-log-data">
                {allComments.allComments.map((value) => (
                  <Tr background="#FFFFFF">
                    <Td>{dateFormatter(value.updatedDataAt)}</Td>
                    <Td>{value.currentUser}</Td>
                    <Td>{value.serviceStatus}</Td>
                    <Td>{value.userComments}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServiceChangesLog;
