import React from "react";
import { Sidebar } from "components/miscellaneousComponents/Sidebar";
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Image,
  WrapItem,
  Select
} from "@chakra-ui/react";
import AddServiceModal from "components/serviceComponents/AddServiceModal";
import AddMapModal from "components/miscellaneousComponents/AddMapModal";
import imgLocation from "../assets/images/location 2.png";
import ServiceFilter from "components/serviceComponents/ServiceFilter";
import { useEffect } from "react";
import Service from "service/EcosystemMapServices";
import ServiceRegion from "service/RegionServices";
import { useState } from "react";
import { ServiceMap } from "components/serviceMapComponents/serviceMap";
import { UserRightTopbar } from "../components/miscellaneousComponents/UserRightTopbar";
import { useHistory, withRouter ,useParams} from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ConverterSDP from "components/miscellaneousComponents/ConverterSDP";
import { useTranslation } from 'react-i18next';

const HomePage = ({ location }) => { 
  const { t } = useTranslation();
  const toast = useToast();
  const { serviceId }= useParams();
  const {replace} = useHistory()
  const [item, setItem] = useState([]);
  const [maplist, setMaplist] = useState([]);
  const [mapName, setMapName] = useState({});
  const [filter,setFilter]=useState({})
  const history = useHistory();
  const [tempService,setTempService]=useState([])
  const getService = (mapID) => {
    Service.getServicesList(mapID).then((res) => {
      setItem(res);
      setTempService(res);
    });
  };

  const callToast = () => {
    toast({
      title: (t('startup.toast.service.name.error')),
      description: (t('startup.toast.service.name.message')),
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };

  // useEffect(() => {
  //   //fetchAllEcoMaps();
  //   if (location && location.state) {
  //     setMapName(location.state.mapName);
  //   }
  //   // if(serviceId){
  //   //   debugger
  //   //  const selectedService = maplist.find((map)=>map.id==serviceId)
  //   //   if(selectedService){
  //   //     setMapName(selectedService.name);

  //   //   }
  //   // }
  // }, [location]);

  useEffect(() => {
    ServiceRegion.getAllEcoMap().then((res) => {
      setMaplist(res);
      if(serviceId && res.length>0){
       const selectedService = res.find((map)=>map.id===serviceId)
        if(selectedService){
          setMapName(selectedService);
        }
      }
    });
  //  getService(mapName.id); 
  }, [serviceId]);

  useEffect(()=>{
    if(mapName){
      getService(mapName.id);
    }
  },[mapName])

  const filterByMultipleColumns=(items, filterCriteria)=> {
   
    let result=tempService
    // tempService.forEach((item)=>{
    //   Object.keys(filterCriteria).forEach((criteria)=>{
       
    //     if(typeof filterCriteria[criteria]==='boolean'){
    //       if(item[criteria]===filterCriteria[criteria]){
    //         result.add(item)
    //       }
    //     }
    //     else{
    //       if(item[criteria].includes(filterCriteria[criteria])){
    //         result.add(item)
    //       }
    //     }
    //   })
    // })

    Object.keys(filterCriteria).forEach((criteria)=>{
      switch(criteria){
        case "serviceName":
        result= filterCriteria.serviceName!=="" ? result.filter((i)=>i.serviceName.toLowerCase().includes(filterCriteria.serviceName.toLowerCase())) : result
        break;
        // case "onlineService":
        //   result=result.filter((i)=>i.onlineService===filterCriteria.onlineService)
        // break;
        // case "offlineSerivce":
        //   result=result.filter((i)=>i.offlineSerivce===filterCriteria.offlineSerivce)
        // break;
        case "location":
          result = filterCriteria.location ?  result.filter((item)=> ( filterCriteria.location.onlineService===item.onlineService || filterCriteria.location.offlineSerivce===item.offlineSerivce ) && ( item.serviceLocation !== "") ): result
          break;
        case "serviceFocus":
          result= filterCriteria.serviceFocus.length>0 ? result.filter((i)=>filterCriteria.serviceFocus.includes(i.serviceFocus)) : result
        break;
        case "serviceStatus":
          result= filterCriteria.serviceStatus.length>0 ? result.filter((i)=>filterCriteria.serviceStatus.includes(i.serviceStatus)) : result
        break;
        case "applicationType":
          result= filterCriteria.applicationType.length > 0 ? result.filter((i)=>filterCriteria.applicationType.includes(i.applicationType)) : result
        break;
        case "phase":
        result = result.filter((i)=>ConverterSDP.getPoint(i.fromPhase) >= ConverterSDP.getPoint(filterCriteria.phase.fromPhase) &&  ConverterSDP.getPoint(i.toPhase) <= ConverterSDP.getPoint(filterCriteria.phase.toPhase) )
        break;
        default:
          result=tempService
        break;
      }
    })
  return result;
  }

  const ServiceCategoryVal = (val) => {
      var filteredData = filterByMultipleColumns(item, filter);
      setItem(filteredData);
  };

  const ServiceCategorySDPVal = (phase) => {
    // Service.getServicesListBySDPFilter(phase).then((res) => {
    //   let items = [];
    //   items = res;
    //   setItem(items);
    // });
  };

  const clearFilter = () => {
    getService(mapName.id);
    setFilter({});
  };
  // const fetchAllEcoMaps = () => {
  //   ServiceRegion.getAllEcoMap().then((res) => {
  //     setMaplist(res);
  //     if(serviceId && res.length>0){
  //      const selectedService = res.find((map)=>map.id===serviceId)
  //       if(selectedService){
  //         setMapName(selectedService);
  //       }
  //     }
  //   });
  // };
  const handleChanged = (e) => {
    const { value } = e.target;
    const selectedMap = maplist.find((map)=>map.id===value)
        if(selectedMap){
          setMapName(selectedMap);
          replace("/services/"+value);
        }
        if(value === (t('startup.landing.page.header.user.profile.menu.list.map.text'))){
          history.push("/ecosystemmap")
        }
   // sessionStorage.setItem("ecomapid", value)
  //  getService(value);  
  }
  const createNewService=(data)=>{
 Service.pushService(data).then((res) => {
      // setBasicInfo(["", "", "", ""]);
      // setRes(true);
      // sendData(true)
      // setTimeout(() => {
      //   onOpen(false);
      //   onClose(true);
      // }, 1000);
      getService(mapName.id)
      if (res.message !== undefined) {
        callToast();
      }
    });
  }
  const filterValuesCallback=(key,value)=>{
    filter[key]=value
    setFilter(filter)
  }
  return (
    <div className="body-bg">
      <Sidebar items={item} />
      <div className="v-stack">
        <VStack style={{ height: "inherit" }} spacing={"16px"} align="stretch">
          <Box justifyContent="center" className="first-stack" w="100%">
            <Grid
              className="firstStack-mg"
              templateColumns="repeat(15, 1fr)"
              gap={"5px"}
            >
              <GridItem colStart={1} colEnd={2}>
                <Image
                  w="49px"
                  h="49px"
                  src={imgLocation}
                  alt="image"
                  mr="1"
                  mt="-10px"
                  align="center"
                />
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Select
                  value={mapName.id}
                  width="100%"
                  onChange={(e) => handleChanged(e)}
                  // placeholder={mapName.name}
                >
                  {maplist.map((result) => (
                    <option value={result.id}>{result.name}</option>
                  ))}
                  <option disabled="disabled"> ------------------------------------ </option>
 
                  <option>{t('startup.landing.page.header.user.profile.menu.list.map.text')}</option>
                </Select>
                {/* <Text className="nb-hdr check-text">
                  {props.location.state.mapName}
                </Text> */}
              </GridItem>
              <GridItem colStart={5} colEnd={9}>
              <AddMapModal isHome={true}/>
              </GridItem>
              <GridItem colStart={9} colEnd={11}>
                <AddServiceModal
                  sendData={(data) => {
                    if (data === true) {
                      Service.getServicesList().then((res) => {
                        setItem(res);
                      });
                    }
                  }}
                  mapId={mapName.id}
                  createNewServiceCallback={createNewService}
                />
              </GridItem>
              
              <GridItem colStart={11} colEnd={13}>
                <WrapItem float={"right"} display="flex">
                  <ServiceFilter
                    clearFilter={() => {
                      clearFilter();
                    }}
                    ServiceCategoryVal={(name) => {
                      ServiceCategoryVal(name);
                    }}
                    ServiceCategorySDPVal={(renge) => {
                      ServiceCategorySDPVal(renge);
                    }}
                    filterValuesCallback={filterValuesCallback}
                    filterCriteria={filter}
                  />
                  <div className="divider"></div>
                </WrapItem>
              </GridItem>

              <GridItem colStart={14} colEnd={15}>
                <UserRightTopbar />
              </GridItem>
            </Grid>
          </Box>
          <Box className="first-stack" h="100%" w="100%">
            <ServiceMap reloadServices={(id)=>getService(id)} data={item} />
          </Box>
        </VStack>
      </div>
    </div>
  );
};

export default withRouter(HomePage);
