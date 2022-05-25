import React, { useState, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import { greyTextColor, mediumPadding } from "../../../../helper/constant";
import EcosystemMapServices from "../../../../service/EcosystemMapServices";

function SaveFilterAlertDialog(props) {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    if (props.isEditing) {
      setIsError(false);
      setFilterName(props.name);
    } else {
      setFilterName("");
    }
  }, [props.isOpen]);

  function handleNameFilterChange(input) {
    if (input === "") {
      setIsError(true);
    } else {
      setIsError(false);
      setFilterName(input);
    }
  }

  async function handleSaveFilter() {
    if (filterName === "") {
      setIsError(true);
    } else {
      let savedFilter;
      if (props.savedFilters !== null) {
        let tempObject = {};

        props.savedFilters.forEach((savedFilter) => {
          tempObject = {
            ...tempObject,
            [savedFilter[0]]: savedFilter[1],
          };
        });

        if (props.isEditing) {
          savedFilter = {
            ...tempObject,
          };

          // Rename the key of the object
          savedFilter[filterName] = savedFilter[props.name];
          delete savedFilter[props.name];
        } else {
          // We create a new object
          savedFilter = {
            ...tempObject,
            [filterName]: {},
          };
        }
      } else {
        savedFilter = {
          [filterName]: {},
        };
      }

      props.filters.forEach((filter) => {
        if (filter.id !== 0 && filter.selectedFilterCount !== 0) {
          savedFilter[filterName] = {
            ...savedFilter[filterName],
            [filter.id]: {
              name: filter.name,
              items: [],
            },
          };

          filter.items.forEach((item) => {
            if (item.value) {
              savedFilter[filterName][filter.id].items.push(item.name);
            }
          });
        }
      });

      const data = {
        id: props.mapId,
        filters: savedFilter,
      };

      const res = await EcosystemMapServices.createSavedFilter(data);

      if (res.updateEcosystemMap) {
        props.onClose();
        const tempFilter = [...props.filters];

        const entries = Object.entries(res.updateEcosystemMap.filters);

        if (!props.isEditing) {
          const index = entries.length - 1;

          // Length-1 to retrieve the last element that we just add.
          const newFilter = {
            name: entries[index][0],
            items: entries[index][1],
            isSelected: false,
          };

          tempFilter[0].items.push(newFilter);
        } else {
          const index = entries.findIndex(
            (element) => element[0] === filterName
          );

          tempFilter[0].items[index].name = filterName;
        }

        setFilterName("");
        props.setFilters(tempFilter);
      }
    }
  }

  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={React.useRef()}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">Save a filter</AlertDialogHeader>

          <AlertDialogBody>
            <InputComponent
              isRequired={true}
              value={filterName}
              placeholder="Filter view name"
              onChange={handleNameFilterChange}
            />
            {isError && (
              <Text color="red">mapping.canvas.form.filter.name.error</Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonComponent
              padding={`0 ${mediumPadding} 0 0`}
              buttonText={t("common.cancel")}
              isWithoutBorder={true}
              color={greyTextColor}
              onClick={() => {
                setFilterName("");
                props.onClose();
              }}
            />
            <ButtonComponent
              buttonText={t("mapping.canvas.form.save.button")}
              isPrimary={true}
              onClick={handleSaveFilter}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default SaveFilterAlertDialog;
