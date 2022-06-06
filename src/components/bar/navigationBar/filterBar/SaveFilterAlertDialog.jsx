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
import ButtonComponent from "../../../basic/buttons/ButtonComponent";
import {
  greyTextColor,
  mediumPadding,
  verySmallPadding,
} from "../../../../helper/constant";
import { Maps } from "../../../../service/maps";

function SaveFilterAlertDialog(props) {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    function changeFilterName() {
      if (props.isEditing) {
        setIsError(false);
        setFilterName(props.name);
      } else {
        setFilterName("");
      }
    }

    changeFilterName();
  }, [props.isEditing, props.isOpen, props.name]);

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
      if (props.filters[0].items !== []) {
        let tempObject = {};

        props.filters[0].items.forEach((savedFilter) => {
          tempObject = {
            ...tempObject,
            [savedFilter.name]: savedFilter.selectedFilters,
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
              selectedFilters: [],
            },
          };

          filter.items.forEach((item) => {
            if (item.value) {
              savedFilter[filterName][filter.id].selectedFilters.push(
                item.name
              );
            }
          });
        }
      });

      const data = {
        id: props.mapId,
        filters: savedFilter,
      };

      const res = await Maps.createSavedFilter(data);

      if (res.updateEcosystemMap) {
        props.onClose();
        const tempFilter = [...props.filters];

        const entries = Object.entries(res.updateEcosystemMap.filters);

        if (!props.isEditing) {
          const index = entries.length - 1;

          // Length-1 to retrieve the last element that we just add.
          const newFilter = {
            name: entries[index][0],
            selectedFilters: entries[index][1],
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
          <AlertDialogHeader fontSize="lg">
            {props.isEditing
              ? t("mapping.alert.dialog.edit.filter.title")
              : t("mapping.alert.dialog.save.filter.title")}
          </AlertDialogHeader>

          <AlertDialogBody>
            <InputComponent
              isRequired={true}
              value={filterName}
              placeholder={t(
                "mapping.navigation.bar.save.filter.placeholder.text"
              )}
              onChange={handleNameFilterChange}
            />
            {isError && (
              <Text color="red" paddingTop={verySmallPadding}>
                {t("mapping.canvas.form.filter.name.error")}
              </Text>
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
