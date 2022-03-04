import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Td,
  Link,
  Text,
  Image,
} from '@chakra-ui/react';
import imgSource from '../../assets/images/sharp.png';
import { useTranslation } from 'react-i18next';

export default function ServiceChangesLog( allCommensts ) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const modalWidth = {
  //   maxWidth: '1099px',
  //   position: 'absolute',
  //   ml: '224px',
  //   mt: '80px',
  //   background: '#DBE2EC',
  //   borderRadius: '10px',
  //   padding: "40px 40px 32px 40px"
  // };

  const dateformater = (date) => {
    try {
      return new Date(date).toUTCString();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link onClick={onOpen}>
        <Text as="u">{t('startup.popup.service.details.content.more.details')}</Text>
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
              {t('startup.popup.comment.table.heading')}
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Table className="tbl-space-row cmn-tbl">
              <Thead className="tbl-log-header">
                <Tr background="#FFFFFF">
                  <Th width="180px">{t('startup.popup.comment.table.column.date.time')} </Th>
                  <Th width="200px">{t('startup.popup.comment.table.column.modified.by')}</Th>
                  <Th width="220px">{t('startup.popup.comment.table.column.status')}</Th>
                  <Th>{t('startup.popup.comment.table.column.comments')}</Th>
                </Tr>
              </Thead>
              <Tbody className="tbl-log-data">
              {allCommensts.allComments.map((value)=>(
                <Tr background="#FFFFFF">
                  <Td>{dateformater(value.updatedDataAt)}</Td>
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
}
