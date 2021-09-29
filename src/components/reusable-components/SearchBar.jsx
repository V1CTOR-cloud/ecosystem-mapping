import React, { useState } from "react";
import {
  Box,
  InputRightAddon,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DebounceInput } from "react-debounce-input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
export const SearchBar = ({ GetKeyWordValue, GetLocationValue,width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const [searchLocValue, setSearchLocValue] = useState("");

  const KeyWordSearch = (val) => {
    setSearchValue(val);
    setSearchLocValue("");
    GetKeyWordValue(val);
  };

  const LocationSearch = (val) => {
    setSearchLocValue(val);
    setSearchValue("");
    GetLocationValue(val);
  };
  return (
    <Box className="mobile-bar-div">
      <InputGroup>
        <Box className="search-div">
          <Box
            width={{
              sm: "110px",
              base: "150px",
              md: "180px",
              lg: "220px",
              xl: "220px",
            }}
          >
            <DebounceInput
              className="search-bar"
              minLength={2}
              debounceTimeout={1000}
              onChange={(event) => KeyWordSearch(event.target.value)}
              placeholder="Keyword"
            />
          </Box>

          <InputGroup>
            <Box
              width={{
                base: "150px",
                sm: "110px",
                md: "180px",
                lg: "220px",
                xl: "220px",
              }}
            >
              {" "}
              <DebounceInput
                onChange={(event) => LocationSearch(event.target.value)}
                placeholder="Location"
                minLength={2}
                debounceTimeout={1000}
                className="search-bar localtion-search"
              />
            </Box>

            {!isOpen && (
              <InputRightAddon
                className="search-bar-icon localtion-search ml-auto"
                onClick={width<550&&onOpen}
                children={<SearchIcon />}
              />
            )}
          </InputGroup>
        </Box>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} className="serach-modal">
        <ModalOverlay />

        <ModalContent className="modal-bg">
          <ModalCloseButton className="close-btn" />
          <DebounceInput
            minLength={2}
            debounceTimeout={500}
            value={searchValue}
            onChange={(event) => KeyWordSearch(event.target.value)}
            className="search-bar-mob "
            placeholder="Keyword"
          />

          <DebounceInput
            onChange={(event) => LocationSearch(event.target.value)}
            placeholder="Location"
            value={searchLocValue}
            minLength={2}
            debounceTimeout={500}
            className="search-bar-mob "
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
