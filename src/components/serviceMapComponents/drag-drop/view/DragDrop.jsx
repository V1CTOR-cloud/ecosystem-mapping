import React, { Component } from "react";
import "../components/style.css";
import { Box, Grid } from "@chakra-ui/layout";
import SDPConverter from "components/miscellaneousComponents/ConverterSDP";
import PublishedServiceForm from "components/serviceComponents/PublishedServiceForm";
import Services from "service/EcosystemMapServices";
import { withRouter } from "react-router";
import { Tooltip } from "@chakra-ui/react";

class DragDrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      chkItems: [],
      value: [1, 2, 3, 4, 5, 6],
      dropArea: "",
    };
  }
  loopFunc() {
    const list_new = [];
    this.setState({ chkItems: this.props.data });
    let Market = [];
    let Organisation = [];
    let MarketAndOrganisation = [];
    let mergedServices = [];
    this.props.data.forEach((i, j) => {
      if (i.applicationType === "Market") {
        Market.push(i);
      }
      if (i.applicationType === "Market_and_Organisation") {
        MarketAndOrganisation.push(i);
      }
      if (i.applicationType === "Organisation") {
        Organisation.push(i);
      }
    });
    Market.sort((a,b)=>new Date(a.updatedTypeAt)-new Date(b.updatedTypeAt))
    Organisation.sort((a,b)=>new Date(a.updatedTypeAt)-new Date(b.updatedTypeAt))
    MarketAndOrganisation.sort((a,b)=>new Date(a.updatedTypeAt)-new Date(b.updatedTypeAt))
    mergedServices.push(...Market);
    mergedServices.push(...MarketAndOrganisation);
    mergedServices.push(...Organisation);
    mergedServices.forEach((i, j) => {
      list_new.push({
        id: j + 1,
        orgName: i,
        isDragging: false,
        isResizing: false,
        background: "pink",
        top: 22 + j * 40,
        // left: (Math.abs(
        //   ((SDPConverter.getPoint(i.fromPhase) -
        //     SDPConverter.getPoint(i.toPhase)) /
        //     18))) * 100 + "%",
        left: (SDPConverter.getOctPoint(i.fromPhase) / 18) * 100 + "%",
        width:
          Math.abs(
            ((SDPConverter.getPoint(i.fromPhase) -
              SDPConverter.getPoint(i.toPhase)) /
              6) *
              100
          ) -
          0.6 +
          "%",
        name: i.serviceName,
        height: 10,
      });
    });
    this.setState({ list: list_new });
  }
  componentDidMount() {
    this.loopFunc();
  }
  componentDidUpdate() {
    if (this.state.chkItems !== this.props.data) {
      this.loopFunc();
    }
  }
  onDragOver(e) {
    console.log("DropArea.onDragOver");
    e.preventDefault();
    return false;
  }

  onDrop(e) {
    this.setState({ dropArea: "" });
    var obj = JSON.parse(e.dataTransfer.getData("application/json"));
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === obj.id);
    if(list[index].orgName.applicationType !== this.state.dropArea){
      Services.UpdateApplicationTypeonDrop({
        id: list[index].orgName.id,
        applicationType: this.state.dropArea,
      }).then((res) => {
        this.props.reloadServices(this.props.match.params.serviceId);
      });
    }
    //api===>ressu===>reload list
    // console.log("DropArea.onDrop", e);
    // var obj = JSON.parse(e.dataTransfer.getData("application/json"));
    // let id = obj.id;
    // if (String(id).includes("SID")) {
    //   console.log("manage services");
    //   let services = this.state.services;
    //   let index = this.state.services.findIndex((item) => item.id === obj.id);
    //   services[index].isDragging = false;
    //   services[index].top = e.clientY - obj.y;

    //   services[index].left = e.clientX - obj.x;

    //   let newState = Object.assign(this.state, {
    //     services: services,
    //   });

    //   this.setState(newState);
    // } else {
    //   let list = this.state.list;

    //   let index = this.state.list.findIndex((item) => item.id === obj.id);
    //   list[index].isDragging = false;
    //    list[index].top = e.clientY - obj.y;

    //   list[index].left = e.clientX - obj.x > 0 && e.clientX - obj.x;
    //   let newState = Object.assign(this.state, {
    //     list: list,
    //   });

    //   this.setState(newState);
    //     // Services.UpdatePhaseRangeonDrop({
    //     //   id: list[index].orgName.id,
    //     //   yPosition: list[index].top
    //     // }).then(res => {
    //     //   console.log(res)
    //     // })
    //     }
    // e.preventDefault();
  }
  updateStateDragging(id, isDragging, type) {
    // alert("hi")
    // if (type === "item") {
    //   let list = this.state.list;
    //   let index = this.state.list.findIndex((item) => item.id === id);
    //   list[index].isDragging = isDragging;
    //   this.setState({ list }, () => {});
    // }
    // if (type === "SERVICE") {
    //   let services = this.state.services;
    //   let index = this.state.services.findIndex((item) => item.id === id);
    //   services[index].isDragging = isDragging;
    //   this.setState({ services }, () => {
    //     //console.log(this.state.services);
    //   });
    // }
  }
  updateStateResizing(id, isResizing, type) {
    // let list = this.state.list;
    // let index = this.state.list.findIndex((item) => item.id === id);
    // list[index].isResizing = isResizing;
    // let newState = Object.assign(this.state, {
    //   list: list,
    // });
    // this.setState(newState);
    // Services.UpdatePhaseRangeonResize({
    //   id: list[index].orgName.id,
    //   toPhase: "zero",
    //   fromPhase: "one"
    // }).then(res => {
    //   console.log(res)
    // })
  }
  updateStateResizing2(id, isResizing) {
    // let list = this.state.list;
    // let index = this.state.services.findIndex((item) => item.id === id);
    // list[index].isResizing = isResizing;
    // let newState = Object.assign(this.state, {
    //   list: list,
    // });
    // this.setState(newState);
  }
  funcResizing(id, clientX, clientY) {
    // let node = ReactDOM.findDOMNode(this.refs["node_" + id]);
    // let list = this.state.list;
    // let index = this.state.list.findIndex((item) => item.id === id);
    // list[index].width = clientX - node.offsetLeft + 16 / 2;
    // list[index].height = clientY - node.offsetTop + 16 / 2;
    // let newState = Object.assign(this.state, {
    //   list: list,
    // });
    // this.setState(newState);
  }

  render() {
    let marketItems = [];
    let marketAndOrganisationItems = [];
    let organisationItems = [];
    let x=0, y=0;

    for (let item of this.state.list) {
      if (item.orgName.applicationType === "Market") {
        x=x+1
        marketItems.push(
          <Draggable
            ref={"node_" + item.id}
            key={item.id}
            id={item.id}
            name={item.name}
            orgName={item.orgName}
            top={item.top}
            background={item.background}
            //left={item.left}
            //width={item.width}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
            updateStateDragging={this.updateStateDragging.bind(this)}
            updateStateResizing={this.updateStateResizing.bind(this)}
            funcResizing={this.funcResizing.bind(this)}
          />
        );
      }
      if (item.orgName.applicationType === "Market_and_Organisation") {
        y=y+1
        marketAndOrganisationItems.push(
          <Draggable
            ref={"node_" + item.id}
            key={item.id}
            id={item.id}
            name={item.name}
            orgName={item.orgName}
            //top={item.top+25}
            top={x>3 ? item.top + 25: x===0 ? item.top + 140: x===1 ? item.top + 100: x===2 ?  item.top + 60 :x===3 ? item.top + 25: null }
            background={item.background}
            //left={item.left}
            //width={item.width}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
            updateStateDragging={this.updateStateDragging.bind(this)}
            updateStateResizing={this.updateStateResizing.bind(this)}
            funcResizing={this.funcResizing.bind(this)}
          />
        );
      }
      if (item.orgName.applicationType === "Organisation") {
        organisationItems.push(
          <Draggable
            ref={"node_" + item.id}
            key={item.id}
            id={item.id}
            name={item.name}
            orgName={item.orgName}
            //top={item.top+50}
            top =
           { x>3  && y===0 ? item.top + 165: x>3  && y===1 ? item.top + 125 :x>3  && y===2 ? item.top + 85  :x>3  && y===3 ? item.top + 50  :x>3 && y>3 ? item.top + 50
            :x===0 && y===0 ? item.top + 280: x===0 && y===1 ? item.top + 240 :x===0 && y===2 ? item.top + 200 :x===0 && y===3 ? item.top + 165 :x===0 && y>3 ? item.top + 165 
            :x===1 && y===0 ? item.top + 240: x===1 && y===1 ? item.top + 200 :x===1 && y===2 ? item.top + 160 :x===1 && y===3 ? item.top + 125 :x===1 && y>3 ? item.top + 125
            :x===2 && y===0 ? item.top + 200: x===2 && y===1 ? item.top + 160 :x===2 && y===2 ? item.top + 120 :x===2 && y===3 ? item.top + 85  :x===2 && y>3 ? item.top + 85
            :x===3 && y===0 ? item.top + 165: x===3 && y===1 ? item.top + 125 :x===3 && y===2 ? item.top + 85  :x===3 && y===3 ? item.top + 50  :x===3 && y>3 ? item.top + 50 
            :null}
            background={item.background}
            //left={item.left}
            //width={item.width}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
            updateStateDragging={this.updateStateDragging.bind(this)}
            updateStateResizing={this.updateStateResizing.bind(this)}
            funcResizing={this.funcResizing.bind(this)}
          />
        );
      }
    }
    let marketLength=marketItems.length > 3 ? marketItems.length * 40 + 5 : 3 * 40 + 5;
    let marketOrgLength=marketAndOrganisationItems.length > 3 ? marketAndOrganisationItems.length * 40 + 5 : 3 * 40 + 5;
    let orgLength=organisationItems.length > 3 ? organisationItems.length * 40 + 5 : 3 * 40 + 5;


    return (
      <Box>
        <Box className="organisation" m="25px 0 25px 0">
          <p className="market">
          
          {/*
           need to solve
           {t('startup.home.page.canvas.header')} */}

          </p>
        </Box>
        <Box
          className="drop-area"
          onDragOver={this.onDragOver.bind(this)}
          onDrop={this.onDrop.bind(this)}
          h={marketLength + marketOrgLength + orgLength + 30 + "px"}
        >
          <Grid
            templateColumns="repeat(6, 1fr)"
            gap={0}
            minH="360px"
            h={marketLength + marketOrgLength + orgLength + 30 + "px"}
          >
            <Box position="relative" className="midLine firstline">
              <Box className="ball">
                <Box className="ball-text">-2</Box>
              </Box>
              <Box
                className="midLine2"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
              <Box
                className="midLine3"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
            </Box>

            <Box position="relative" className="midLine">
              <Box className="ball">
                <Box className="ball-text">-1</Box>
              </Box>
              <Box
                className="midLine2"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
              <Box
                className="midLine3"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
            </Box>

            <Box position="relative" className="midLine">
              <Box className="ball">
                <Box className="ball-text">0</Box>
              </Box>
              <Box
                className="midLine2"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
              <Box
                className="midLine3"
                d="flex"
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
            </Box>

            <Box position="relative" className="midLine">
              <Box className="ball">
                <Box className="ball-text">1</Box>
              </Box>
              <Box
                className="midLine2"
                d="flex"
                //
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
              <Box
                className="midLine3"
                d="flex"
                //
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
            </Box>

            <Box position="relative" className="midLine">
              <Box className="ball">
                <Box className="ball-text">2</Box>
              </Box>
              <Box
                className="midLine2"
                d="flex"
                //
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
              <Box
                className="midLine3"
                d="flex"
                //
                h={marketLength + marketOrgLength + orgLength + 30 + "px"}
              >
                {" "}
              </Box>
            </Box>
            <Box position="relative" className="midLine trs">
              <Box className="ball">
                <Box className="ball-text">3</Box>
              </Box>
            </Box>
            <Box position="absolute" width="83.30%" minH="360px">
              <Tooltip
                //label={t('startup.home.page.canvas.tool.tip.market')}
                hasArrow
                placement="left"
                arrowSize="10px"
                fontSize="15px"
              >
                <Box
                  ref={this.marketBoxref}
                  onDragOver={() => this.setState({ dropArea: "Market" })}
                  id="first"
                  borderRadius="5px"
                  width="100%"
                  h={marketItems.length * 40 + 5 + "px"}
                  mb="20px"
                  style={{
                    border:
                      this.state.dropArea === "Market"
                        ? "3px dotted  #0e5e81"
                        : "2px dotted rgb(143 164 174)",
                    background:
                      this.state.dropArea === "Market"
                        ? "lightgray"
                        : "transparent",
                  }}
                  minH="120px"
                >
                  {marketItems}
                </Box>
              </Tooltip>
              <Tooltip
                //label={t('startup.home.page.canvas.tool.tip.market.and.organisation')}
                hasArrow
                placement="left"
                arrowSize="10px"
                fontSize="15px"
              >
                <Box
                  onDragOver={() =>
                    this.setState({ dropArea: "Market_and_Organisation" })
                  }
                  borderRadius="5px"
                  width="100%"
                  h={marketAndOrganisationItems.length * 40 + 5 + "px"}
                  mb="20px"
                  style={{
                    border:
                      this.state.dropArea === "Market_and_Organisation"
                        ? "3px dotted  #0e5e81"
                        : "2px dotted rgb(143 164 174)",
                    background:
                      this.state.dropArea === "Market_and_Organisation"
                        ? "lightgray"
                        : "transparent",
                  }}
                  minH="120px"
                >
                  {marketAndOrganisationItems}
                </Box>
              </Tooltip>
              <Tooltip
                // label={t('startup.home.page.canvas.tool.tip.organisation')}
                hasArrow
                placement="left"
                arrowSize="10px"
                fontSize="15px"
              >
                <Box
                  onDragOver={() => this.setState({ dropArea: "Organisation" })}
                  borderRadius="5px"
                  width="100%"
                  h={organisationItems.length * 40 + 5 + "px"}
                  style={{
                    border:
                      this.state.dropArea === "Organisation"
                        ? "3px dotted  #0e5e81"
                        : "2px dotted rgb(143 164 174)",
                    background:
                      this.state.dropArea === "Organisation"
                        ? "lightgray"
                        : "transparent",
                  }}
                  minH="120px"
                >
                  {organisationItems}
                </Box>
              </Tooltip>
            </Box>
          </Grid>

          {/* {items} */}
          {/* {this.state.services.map((service) => {
          return (
            <ServiceImport
              id={service.id}
              updateStateDragging={this.updateStateDragging.bind(this)}
              name={service.name}
              top={service.top}
              left={service.left}
              updateStateResizing={this.updateStateResizing2.bind(this)}
              funcResizing={this.funcResizing.bind(this)}
              background={service.background}
              dragging={service.isDragging}
            />
          );
        })} */}
        </Box>
        <Box className="organisation" m="50px 0 10px 0">
          <p>
            {/*
             need to solve
             {t('startup.home.page.canvas.footer')} */}
          </p>
        </Box>
      </Box>
    );
  }
}

class Draggable extends Component {
  obj = new DragDrop();
  onMouseDown(e) {
    console.log("Draggable.onMouseDown");
    var elm = document.elementFromPoint(e.clientX, e.clientY);
    if (elm.className !== "resizer") {
      this.props.updateStateDragging(this.props.id, true, "item");
    }
  }
  onMouseUp(e) {
    console.log("Draggable.onMouseUp");
    this.props.updateStateDragging(this.props.id, false, "item");
  }
  onDragStart(e) {
    //e.stopPropagation()
    console.log("Draggable.onDragStart");
    const nodeStyle = this.refs.node.style;
    if (parseInt(nodeStyle.left) > 0 && parseInt(nodeStyle.top) > 20) {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({
          id: this.props.id,
          x: e.clientX - 0,
          y: e.clientY - parseInt(nodeStyle.top),
        })
      );
    }
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: this.props.id,
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top),
      })
    );
    this.props.updateStateDragging(this.props.id, true, "item");
  }
  onDragEnd(e) {
    //e.stopPropagation()
    console.log("Draggable.onDragEnd");
    //window.removeEventListener('resize', this.onDragStart)
  }
  render() {
    const styles = {
      top: this.props.top,
      left: this.props.left,
      width: this.props.width,
      background:
        this.props.background === undefined ? "white" : this.props.background,
    };
    return (
      <Box
        ref={"node"}
        draggable={true}
        id={"item_" + this.props.id}
        className="item unselectable"
        style={styles}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onDragStart={this.onDragStart.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
        zIndex="0"
      >
        <PublishedServiceForm
          // refreshService={()=>{}}
          bg={this.props.background}
          orgName={this.props.orgName}
          name={this.props.name}
        />
        {/* <Resizer
          ref={"resizerNode"}
          id={this.props.id}
          isResizing={this.props.isResizing}
          resizerWidth={5}
          resizerHeight={5}
          updateStateResizing={this.props.updateStateResizing}
          funcResizing={this.props.funcResizing}
        /> */}
      </Box>
    );
  }
}

// class Resizer extends Component {
//   componentDidMount() {
//     window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
//     window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("mousemove", this.onMouseMove.bind(this), false);
//     window.removeEventListener("mouseup", this.onMouseUp.bind(this), false);
//   }
//   onMouseDown(e) {
//     console.log("Resizer.onMouseDown");

//     this.props.updateStateResizing(this.props.id, true);
//   }
//   onMouseMove(e) {
//     if (this.props.isResizing) {
//       this.props.funcResizing(this.props.id, e.clientX, e.clientY);
//     }
//   }
//   onMouseUp(e) {
//     console.log("Resizer.onMouseUp");
//     if (this.props.isResizing) {
//       this.props.updateStateResizing(this.props.id, false);
//     }
//   }
//   render() {
//     const style = {
//       width: this.props.resizerWidth,
//       height: this.props.resizerHeight,
//     };
//     return (
//       <Box
//         className="resizer"
//         style={style}
//         onMouseDown={this.onMouseDown.bind(this)}
//       ></Box>
//     );
//   }
// }

export default withRouter(DragDrop);
