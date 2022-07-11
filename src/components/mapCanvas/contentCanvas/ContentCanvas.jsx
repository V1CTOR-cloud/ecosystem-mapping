import React, { useContext } from "react";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styled from "styled-components";

import Row from "../drap&dropComponent/row/Row";
import ToastComponent from "../../basic/ToastComponent";
import { Service } from "../../../service/service";
import { CanvasProvider } from "../../../pages/MapCanvasPage";

const ArrowDown = styled.div`
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 7.5px solid #aaaaaa;
`;

const ArrowUp = styled.div`
  border-right: 7.5px solid transparent;
  border-left: 7.5px solid transparent;
  border-bottom: 7.5px solid #aaaaaa;
`;

function ContentCanvas(props) {
  const {
    isFilterOpen,
    secondaryData,
    handleServiceClick,

    isFiltersActive,
  } = props;
  const canvasProvider = useContext(CanvasProvider);
  const [data, setData] = canvasProvider.fetchedData;
  const { t } = useTranslation();

  function setOrder(list, servicesId) {
    list.forEach((value) => {
      const index = servicesId.findIndex((service) => service === value.id);
      if (index !== -1) {
        value.serviceOrder = index;
      }
    });
  }

  async function setOrderAndApplicationType(listIds, services) {
    let error;

    for (const value of Object.values(services)) {
      if (listIds.includes(value.id)) {
        const data = {
          serviceOrder: value.serviceOrder,
          serviceApplication: value.serviceApplication,
        };

        await Service.updateServiceOrderAndApplicationType(
          value.id,
          data
          // eslint-disable-next-line no-loop-func
        ).catch((e) => (error = e));

        //Stop the loop if we have an error
        if (error) {
          break;
        }
      }
    }

    return error;
  }

  function getToast(res) {
    // Display toast to show to the user that either they were a problem or it was updated.
    if (res) {
      ToastComponent(t("mapping.toast.error"), "error");
    } else {
      ToastComponent(t("mapping.toast.success.services.updated"), "success");
    }
  }

  // Update the new positioning of the services
  async function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    // The drop was done outside the droppable area. The destination is null, so we need to have no modification.
    if (!destination) {
      return;
    }

    // We drop the object at the same position that it was previously. We need to have no modification.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Retrieve the initial info the object.
    const start = data.rows[source.droppableId];
    const finish = data.rows[destination.droppableId];

    if (start === finish) {
      const newServiceIds = Array.from(start.serviceIds);
      const newServices = data.services;

      // Remove the element from his initial position.
      newServiceIds.splice(source.index, 1);
      // Add the element at the correct index
      newServiceIds.splice(destination.index, 0, draggableId);

      // Create iterable from the object
      const values = Object.values(newServices);

      // set each order to his correct index
      setOrder(values, newServiceIds);

      // Creation of a new instance of the row with the new serviceIds and the rest of the data.
      const newRow = {
        ...start,
        serviceIds: newServiceIds,
      };

      // Creation of a new instance of the data with the new row and the rest of the data (rowsOrder & service).
      const newData = {
        ...data,
        services: newServices,
        rows: {
          ...data.rows,
          [newRow.id]: newRow,
        },
      };

      setData(newData);

      // Update the database
      const res = await setOrderAndApplicationType(newServiceIds, newServices);

      getToast(res);

      return;
    }

    const newServices = data.services;

    // Moving a service to another row
    const startServiceIds = Array.from(start.serviceIds);
    startServiceIds.splice(source.index, 1);
    const newStart = {
      ...start,
      serviceIds: startServiceIds,
    };

    const finishServiceIds = Array.from(finish.serviceIds);
    finishServiceIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      serviceIds: finishServiceIds,
    };

    // Modification of the application Type field
    newServices[draggableId].serviceApplication = destination.droppableId;

    // set each order to his correct index for the start row
    setOrder(Object.values(newServices), startServiceIds);

    // set each order to his correct index for the finished row
    setOrder(Object.values(newServices), finishServiceIds);

    const newData = {
      ...data,
      services: newServices,
      rows: {
        ...data.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);

    const listIds = startServiceIds.concat(finishServiceIds);

    //Update the database
    const res = await setOrderAndApplicationType(listIds, newData.services);

    getToast(res);
  }

  return (
    <Box h="100%">
      <DragDropContext onDragEnd={handleDragEnd}>
        {secondaryData.rowsOrder.map((rowId, index) => {
          const row = secondaryData.rows[rowId];
          const services = row.serviceIds.map(
            (serviceId) => data.services[serviceId]
          );

          return (
            <Box
              minHeight={
                index === 0
                  ? `calc((100vh - ${isFilterOpen ? 135 : 75}px)  / 3)`
                  : index === 1
                  ? `calc((100vh - ${isFilterOpen ? 135 : 75}px)  / 3 - 10px)`
                  : `calc((100vh - ${isFilterOpen ? 135 : 75}px) / 3 - 20px)`
              }
              key={row.id}
              display="flex"
              marginTop={index !== 0 ? "10px" : 0}
            >
              <Box flexGrow={1}>
                <Row
                  key={row.id}
                  row={row}
                  services={services}
                  handleServiceClick={handleServiceClick}
                  isFilterOpen={isFilterOpen}
                  isFiltersActive={isFiltersActive}
                />
              </Box>
              <Box w="75px" paddingLeft="15px" textAlign="center">
                <HStack position="relative" w="100%" h="100%">
                  <VStack
                    bg={"blackAlpha.400"}
                    w="2px"
                    h="100%"
                    justify="space-between"
                  >
                    <ArrowDown />
                    <ArrowUp />
                  </VStack>
                  <Text
                    marginLeft={3}
                    color={"blackAlpha.400"}
                    style={{ writingMode: "vertical-lr" }}
                  >
                    {row.id.replaceAll("_", " ").replace("and", "&")}
                  </Text>
                </HStack>
              </Box>
            </Box>
          );
        })}
      </DragDropContext>
    </Box>
  );
}

ContentCanvas.propTypes = {
  isFiltersActive: PropTypes.bool.isRequired,
  isFilterOpen: PropTypes.bool.isRequired,
  secondaryData: PropTypes.object.isRequired,
  handleServiceClick: PropTypes.func.isRequired,
};

export default ContentCanvas;
