import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Input, Textarea } from "@chakra-ui/react";
import { Center, Button, Image } from "@chakra-ui/react";
import imageUpload from "../../assets/images/imageUpload.png";
import enhancer from "components/formik-enhancer/addEditEvent";
import Service from "./service/graphQueries";
import OtherServices from "service/CommonService";
import DateTimePicker from "react-datetime-picker";
import { SDPSelection } from "./SDPSelection";
import { PhaseRange } from "components/phase-range-bar/PhaseRange";
import SDPConverter from "components/converter-sdp/ConverterSDP";
import { useEffect } from "react";
import CustomSelect from "components/reusable-components/LocationDropdown";
import { useToast } from "@chakra-ui/react";

const AddEditEvent = (props) => {
  const { cancelModal, edit, getResFromEditModal, data } = props;

  const [value, onChange] = useState(
    props.data !== undefined ? new Date(props.data.startDateTime) : new Date()
  );
  const [SDPType, setSDPType] = useState("");
  const [Location, setLocation] = useState([]);
  const [AddLocation, setAddLocation] = useState(false);
  const style = { width: "50%", margin: "25px 0px 57px 10px" };
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    isValid,
  } = props;

  // const temp = SDPConverter.getPoint(-1);
  const toast = useToast();
  useEffect(() => {
    OtherServices.getLocation().then((res) => {
      setLocation(res);
    });
  }, []);
  const handleFormsSubmit = (e) => {
    let { values, handleSubmit, isValid } = props;
    values.datetime = value;
    e.preventDefault();

    if (isValid && value !== null && edit !== true) {
      Service.addData(values).then((s) => {
        if (s.publishManyEventProfilesConnection.aggregate.count === 1) {
          cancelModal(false);
          toast({
            title: "Success",
            position: "top-right",
            description: "Event Created",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        }
      });
    } else if (edit === true && value !== null) {
      values.location = !AddLocation;
      
      values.city_id = values.city_id===undefined?data.eventLocation.id:values.city_id;
      Service.updateProfile(values, props.data.id).then((s) => {
        if (s.publishManyEventProfilesConnection.aggregate.count === 1) {
          getResFromEditModal(true);
          toast({
            title: "Success",
            position: "top-right",
            description: "Event Updated",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        }
      });
    }

    handleSubmit();
  };
  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <></>;
    }
  };
  const fromAutomated = (p) => {
    values.from_A = p[0];
    values.from_M = null;
    values.To_M = null;
    values.To_A = p[1];
  };
  const fromManual = (p) => {
    values.from_A = null;
    values.from_M = p[0];
    values.To_M = p[1];
    values.To_A = null;
  };
  const FromPoint = (p) => {
    if (p.fromPhaseAutomated !== null) {
      return SDPConverter.getPoint(p.fromPhaseAutomated);
    } else if (p.fromPhaseManual !== null) {
      return SDPConverter.getPoint(p.fromPhaseManual);
    } else {
      return null;
    }
  };

  const ToPoint = (p) => {
    if (p.toPhaseAutomated !== null) {
      return SDPConverter.getPoint(p.toPhaseAutomated);
    } else if (p.toPhaseManual !== null) {
      return SDPConverter.getPoint(p.toPhaseManual);
    } else {
      return null;
    }
  };
  const getLocationData = (data) => {
    if (data.length === 2) {
      values.location = !AddLocation;
      values.city_id=data[0];
      values.loc=data[0];
      
      handleChange(true);
      handleBlur(true);
    }
  };
  // const ManualLoc = (data) => {
  //   values.location = false;
  //   values.loc = data;
  //   handleChange(true);
  //   handleBlur(true);
  // };
  // const handleImage = (e) => {
  //   Service.addImage(e.target.files[0]);
  // };
  return (
    <Box
      className={
        edit !== true ? "extra-border box-shadow  p-15 card-margin" : ""
      }
      bg="white"
      p={4}
      color="black"
      style={{ textAlign: "left" }}
    >
      {edit !== true && <p className="addEventTag">Add a New Event</p>}
      <Box h="30px" />
      <form onSubmit={handleFormsSubmit}>
        <Flex color="white">
          <Box flex="8">
            <Box d="grid">
              <Input
                className="ipBox"
                w="50%"
                size="sm"
                placeholder="Event Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                id="title"
              />
              <Error field="title" />
            </Box>
            <Box h="20px" />
            <Textarea
              className="ipBox"
              placeholder="Event Description"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              id="desc"
            />
            <Error field="desc" />
            <Box h="20px" />
            <Box d="grid">
              <Input
                className="ipBox"
                w="70%"
                size="sm"
                type="url"
                placeholder="Registeration URL"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                id="url"
              />
              <Error field="url" />
            </Box>
            <Box h="20px" />
            <Box d="grid">
              {/* 
              <Error field="loc" /> */}

              {!AddLocation && (
                <Box display="inline-flex">
                  <CustomSelect
                    id="loc"
                    getLocationData={(data) => {
                      getLocationData(data);
                    }}
                    data={Location}
                    location={data !== undefined && data.eventLocation}
                  />
                  <Button
                    style={{ margin: "-2px 0rem 0rem 5px" }}
                    color="black"
                    onClick={() => {
                      setAddLocation(!AddLocation);
                    }}
                  >
                    {AddLocation === true ? "-" : "+"}
                  </Button>
                </Box>
              )}

              {AddLocation && (
                <Box>
                  {" "}
                  <Input
                    className="ipBox"
                    w="70%"
                    size="sm"
                    mt="15px"
                    placeholder="Event Location"
                    value={values.loc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="loc"
                  />{" "}
                  <Button
                    style={{ margin: "-2px 0rem 0rem 5px" }}
                    color="black"
                    onClick={() => {
                      setAddLocation(!AddLocation);
                    }}
                  >
                    {AddLocation === true ? "-" : "+"}
                  </Button>
                </Box>
              )}
              <Error field="loc" />
            </Box>
            <Box h="20px" />
            <DateTimePicker
              className="ipBox"
              onChange={onChange}
              value={value}
            />

            <Box h="20px" />
            <Box d="grid">
              <Input
                className="ipBox"
                w="70%"
                size="sm"
                placeholder="Contact Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                id="email"
              />
              <Error field="email" />
            </Box>
            <Box h="20px" />
          </Box>
          <Box p="10px" />
          <Box flex="2">
            <Center>
              <Box className="imgBox imgDiv">
                <Image className="" src={imageUpload} alt="Segun Adebayo" />
              </Box>
              {/* <input accept="image/*" onChange={handleImage} type="file"/> */}
            </Center>
          </Box>
        </Flex>
        {edit !== true && (
          <Box>
            <SDPSelection
              getSelection={(s) => {
                setSDPType(s);
                values.SDP = s;
                handleChange();
                handleBlur();
              }}
            />
          </Box>
        )}

        {SDPType !== "" && edit !== true && (
          <Box style={style}>
            {SDPType === "Automated" ? (
              <PhaseRange
                getValuesFromBar={(p) => {
                  fromAutomated(p);
                }}
                low={-0.3}
                high={3}
                block={true}
              />
            ) : (
              <PhaseRange
                getValuesFromBar={(p) => {
                  fromManual(p);
                }}
              />
            )}
          </Box>
        )}
        {edit === true && (
          <Box style={style}>
            <PhaseRange
              getValuesFromBar={(p) => {
                fromManual(p);
              }}
              low={FromPoint(data)}
              high={ToPoint(data)}
            />
          </Box>
        )}
        {edit !== true && <Error field="SDP" />}

        <Box style={{ display: "flow-root" }}>
          {edit !== true ? (
            <Button
              className={isValid ? "register-btn" : "addEventSubmitBtn"}
              type="submit"
              colorScheme="blue"
            >
              Submit
            </Button>
          ) : (
            <Button className={"register-btn"} type="submit" colorScheme="blue">
              Update
            </Button>
          )}
          {edit !== true && (
            <Button
              className="addEventSubmitBtn"
              onClick={() => {
                cancelModal(false);
              }}
              color="black"
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};
export default enhancer(AddEditEvent);
