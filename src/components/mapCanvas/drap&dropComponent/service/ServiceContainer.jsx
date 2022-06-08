import React, { useContext } from "react";

import styled from "styled-components";
import { Handles, Rail, Slider, Tracks } from "react-compound-slider";
import { Draggable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import Handle from "../handle/Handle";
import { borderRadius, smallPadding } from "../../../../helper/constant";
import ServiceName from "./ServiceName";
import toastComponent from "../../../basic/ToastComponent";
import { MapCanvasPageContext } from "../../../../pages/MapCanvasPage";
import serviceFocus from "../../../../assets/servicesFocus.json";
import { Service } from "../../../../service/service";

const ServiceLineContainer = styled.div`
  padding-bottom: ${smallPadding};
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: ${borderRadius};
`;

const sliderStyle = {
  position: "relative",
  width: "100%",
  height: 30,
};

function ServiceContainer(props) {
  const { service, index, isFilterActive, handleServiceClick } = props;
  const { t } = useTranslation();
  const mapCanvasPageContext = useContext(MapCanvasPageContext);

  let sourceValue = Service.replacePhaseToNumber(
    service.servicePhaseRange.startPhase
  );
  let targetValue = Service.replacePhaseToNumber(
    service.servicePhaseRange.endPhase
  );

  async function handleSlideEnd(sourceValue, targetValue) {
    // Update the model everytime we resize it.
    service.servicePhaseRange.startPhase =
      Service.replaceNumberToPhase(sourceValue);
    service.servicePhaseRange.endPhase =
      Service.replaceNumberToPhase(targetValue);

    const dataToUpdate = {
      id: service.id,
      servicePhaseRange: {
        id: service.servicePhaseRange.id,
        startPhase: service.servicePhaseRange.startPhase,
        endPhase: service.servicePhaseRange.endPhase,
      },
    };

    const res = await Service.updateRangesPhase(dataToUpdate).catch((e) => [
      "Error",
      e,
    ]);

    // Display toast to show to the user that either they were a problem or it was updated.
    if (res[0] === "Error") {
      toastComponent(t("mapping.toast.error"), "error");
    } else {
      toastComponent(t("mapping.toast.success.service"), "success");
    }
  }

  function onClick(getEventData, service) {
    document.addEventListener(
      "click",
      (e) => createNewService(e, getEventData, service),
      {
        once: true,
      }
    );
  }

  async function createNewService(e, getEventData, thisService) {
    const newStartPhase =
      getEventData(e).value <= 4 && getEventData(e).value >= 3
        ? 3
        : getEventData(e).value;
    const newEndPhase =
      getEventData(e).value + 2 >= 4 ? 4 : getEventData(e).value + 2;

    const newService = {
      serviceName: `Default name: ${createId(4)}`,
      applicationType: thisService.applicationType,
      serviceFocus: serviceFocus.servicesFocus[0].name.replaceAll(" ", ""),
      order: thisService.order + 1,
      servicePhaseRange: {
        startPhase: Service.replaceNumberToPhase(newStartPhase),
        endPhase: Service.replaceNumberToPhase(newEndPhase),
      },
      serviceStartTime: new Date(),
      serviceEndTime: new Date(),
      serviceLocation: {
        continent: null,
        country: null,
        region: null,
        city: null,
      },
      serviceStatus: "Draft",
      mapId: mapCanvasPageContext.mapId,
      organisationId: null,
    };

    const res = await Service.createService(newService);
    // Check if we created the service
    if (res.createService) {
      const newRes = await reorderServiceList(thisService, res.createService);

      // const newData = addServiceToData(res);
      if (newRes === undefined) {
        toastComponent(
          t("mapping.toast.success.create.service"),
          "success",
          5000
        );
      } else {
        toastComponent(res, "error", 5000);
      }
    } else {
      toastComponent(res, "error", 5000);
    }
  }

  async function reorderServiceList(serviceClicked, newService) {
    const newServiceIds = Array.from(
      mapCanvasPageContext.fetchedData[0].rows[serviceClicked.applicationType]
        .serviceIds
    );
    const newServices = {
      ...mapCanvasPageContext.fetchedData[0].services,
      [newService.id]: newService,
    };

    // Add the element at the correct index
    newServiceIds.splice(serviceClicked.order + 1, 0, newService.id);

    // Create iterable from the object
    const values = Object.values(newServices);

    // set each order to his correct index
    setOrder(values, newServiceIds);

    // Creation of a new instance of the row with the new serviceIds and the rest of the data.
    const newRow = {
      ...mapCanvasPageContext.fetchedData[0].rows[
        serviceClicked.applicationType
      ],
      serviceIds: newServiceIds,
    };

    // Creation of a new instance of the data with the new row and the rest of the data (rowsOrder & service).
    const newData = {
      ...mapCanvasPageContext.fetchedData[0],
      services: newServices,
      rows: {
        ...mapCanvasPageContext.fetchedData[0].rows,
        [newRow.id]: newRow,
      },
    };

    mapCanvasPageContext.fetchedData[1](newData);

    // Update the database
    return await setOrderAndApplicationType(newServiceIds, newServices);
  }

  async function setOrderAndApplicationType(listIds, services) {
    let error;

    for (const value of Object.values(services)) {
      if (listIds.includes(value.id)) {
        const data = {
          order: value.order,
          applicationType: value.applicationType,
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

  function setOrder(list, servicesId) {
    list.forEach((value) => {
      const index = servicesId.findIndex((service) => service === value.id);
      if (index !== -1) {
        value.order = index;
      }
    });
  }

  function createId(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <Draggable
      draggableId={service.id}
      index={index}
      isDragDisabled={isFilterActive}
    >
      {(provided) => (
        <ServiceLineContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Slider
            rootStyle={sliderStyle}
            domain={[-2, 4]}
            step={1 / 3}
            values={
              // Convert all the string to numeric value
              [
                Service.replacePhaseToNumber(
                  service.servicePhaseRange.startPhase
                ),
                Service.replacePhaseToNumber(
                  service.servicePhaseRange.endPhase
                ),
              ]
            }
            mode={2}
            onSlideEnd={() => handleSlideEnd(sourceValue, targetValue)}
          >
            <Rail>
              {({ getEventData }) => (
                <Box
                  cursor={"pointer"}
                  position={"absolute"}
                  w={"100%"}
                  h="40px"
                  onClick={() => onClick(getEventData, service)}
                />
              )}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <Box>
                  {handles.map((handle, index) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      getHandleProps={getHandleProps}
                      isFirst={index === 0}
                    />
                  ))}
                </Box>
              )}
            </Handles>
            <Tracks right={false} left={false}>
              {({ tracks }) => (
                <Box>
                  {tracks.map(({ id, source, target }) => {
                    // Each change we assign the value to the temporary variables to update in the onSlideEnd
                    sourceValue = source.value;
                    targetValue = target.value;

                    return (
                      <ServiceName
                        key={id}
                        source={source}
                        target={target}
                        provided={provided}
                        service={service}
                        handleServiceClick={handleServiceClick}
                      />
                    );
                  })}
                </Box>
              )}
            </Tracks>
          </Slider>
        </ServiceLineContainer>
      )}
    </Draggable>
  );
}

ServiceContainer.propTypes = {
  isFilterActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  service: PropTypes.object.isRequired,
  handleServiceClick: PropTypes.func.isRequired,
};

export default ServiceContainer;
