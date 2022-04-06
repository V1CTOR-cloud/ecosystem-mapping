import React, { Component } from "react";
import "../components/style.css";
import { Box, Grid, HStack } from "@chakra-ui/layout";
import SDPConverter from "components/miscellaneousComponents/ConverterSDP";
import PublishedServiceForm from "components/serviceComponents/PublishedServiceForm";
import Services from "service/EcosystemMapServices";
import { withRouter } from "react-router-dom";

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
    this.props.data.forEach((i) => {
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
    Market.sort(
      (a, b) => new Date(a.updatedTypeAt) - new Date(b.updatedTypeAt)
    );
    Organisation.sort(
      (a, b) => new Date(a.updatedTypeAt) - new Date(b.updatedTypeAt)
    );
    MarketAndOrganisation.sort(
      (a, b) => new Date(a.updatedTypeAt) - new Date(b.updatedTypeAt)
    );
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
    e.preventDefault();
    return false;
  }

  onDrop(e) {
    this.setState({ dropArea: "" });
    let obj = JSON.parse(e.dataTransfer.getData("application/json"));
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === obj.id);
    if (list[index].orgName.applicationType !== this.state.dropArea) {
      Services.UpdateApplicationTypeonDrop({
        id: list[index].orgName.id,
        applicationType: this.state.dropArea,
      }).then(() => {
        this.props.reloadServices(this.props.match.params.serviceId);
      });
    }
  }

  render() {
    let marketItems = [];
    let marketAndOrganisationItems = [];
    let organisationItems = [];
    let x = 0,
      y = 0;

    for (let item of this.state.list) {
      if (item.orgName.applicationType === "Market") {
        x = x + 1;
        marketItems.push(
          <Draggable
            ref={"node_" + item.id}
            key={item.id}
            id={item.id}
            name={item.name}
            orgName={item.orgName}
            top={item.top}
            background={item.background}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
          />
        );
      }
      if (item.orgName.applicationType === "Market_and_Organisation") {
        y = y + 1;
        marketAndOrganisationItems.push(
          <Draggable
            ref={"node_" + item.id}
            key={item.id}
            id={item.id}
            name={item.name}
            orgName={item.orgName}
            //top={item.top+25}
            top={
              x > 3
                ? item.top + 25
                : x === 0
                ? item.top + 140
                : x === 1
                ? item.top + 100
                : x === 2
                ? item.top + 60
                : x === 3
                ? item.top + 25
                : null
            }
            background={item.background}
            //left={item.left}
            //width={item.width}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
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
            top={
              x > 3 && y === 0
                ? item.top + 165
                : x > 3 && y === 1
                ? item.top + 125
                : x > 3 && y === 2
                ? item.top + 85
                : x > 3 && y === 3
                ? item.top + 50
                : x > 3 && y > 3
                ? item.top + 50
                : x === 0 && y === 0
                ? item.top + 280
                : x === 0 && y === 1
                ? item.top + 240
                : x === 0 && y === 2
                ? item.top + 200
                : x === 0 && y === 3
                ? item.top + 165
                : x === 0 && y > 3
                ? item.top + 165
                : x === 1 && y === 0
                ? item.top + 240
                : x === 1 && y === 1
                ? item.top + 200
                : x === 1 && y === 2
                ? item.top + 160
                : x === 1 && y === 3
                ? item.top + 125
                : x === 1 && y > 3
                ? item.top + 125
                : x === 2 && y === 0
                ? item.top + 200
                : x === 2 && y === 1
                ? item.top + 160
                : x === 2 && y === 2
                ? item.top + 120
                : x === 2 && y === 3
                ? item.top + 85
                : x === 2 && y > 3
                ? item.top + 85
                : x === 3 && y === 0
                ? item.top + 165
                : x === 3 && y === 1
                ? item.top + 125
                : x === 3 && y === 2
                ? item.top + 85
                : x === 3 && y === 3
                ? item.top + 50
                : x === 3 && y > 3
                ? item.top + 50
                : null
            }
            background={item.background}
            //left={item.left}
            //width={item.width}
            width="99.70%"
            height={item.height}
            isDragging={item.isDragging}
            isResizing={item.isResizing}
          />
        );
      }
    }
    let marketLength =
      marketItems.length > 3 ? marketItems.length * 40 + 5 : 3 * 40 + 5;
    let marketOrgLength =
      marketAndOrganisationItems.length > 3
        ? marketAndOrganisationItems.length * 40 + 5
        : 3 * 40 + 5;
    let orgLength =
      organisationItems.length > 3
        ? organisationItems.length * 40 + 5
        : 3 * 40 + 5;

    return (
      <Box
        marginY={"25px"}
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
            <Box
              className="midLine2"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
            <Box
              className="midLine3"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
          </Box>

          <Box position="relative" className="midLine">
            <Box
              className="midLine2"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
            <Box
              className="midLine3"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
          </Box>

          <Box position="relative" className="midLine">
            <Box
              className="midLine2"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
            <Box
              className="midLine3"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
          </Box>

          <Box position="relative" className="midLine">
            <Box
              className="midLine2"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
            <Box
              className="midLine3"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
          </Box>

          <Box position="relative" className="midLine">
            <Box
              className="midLine2"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
            <Box
              className="midLine3"
              d="flex"
              h={marketLength + marketOrgLength + orgLength + 30 + "px"}
            />
          </Box>
          <Box position="relative" className="midLine trs" />
          <Box
            position="absolute"
            width="83.30%"
            minH="360px"
            //backgroundColor={"#7923A5"}
            zIndex={"0"}
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
            <Box
              onDragOver={() =>
                this.setState({ dropArea: "Market_and_Organisation" })
              }
              borderRadius="5px"
              width="100%"
              h={marketAndOrganisationItems.length * 40 + 5 + "px"}
              mb="20px"
              zIndex={"1"}
              style={{
                border:
                  this.state.dropArea === "Market_and_Organisation"
                    ? "3px dotted  #0e5e81"
                    : "2px dotted rgb(143 164 174)",
                background:
                  this.state.dropArea === "Market_and_Organisation"
                    ? "lightgray"
                    : "transparent",
                verticalAlign: "center",
              }}
              minH="120px"
            >
              <div
                style={{
                  zIndex: 10,
                }}
              >
                {marketAndOrganisationItems}
              </div>
              <HStack
                h={marketAndOrganisationItems.length * 40 + 5 + "px"}
                minH="120px"
                style={{
                  position: "absolute",
                  width: "111%",
                  justifyContent: "space-between",
                  left: "-5.5%",
                  zIndex: -1,
                }}
              >
                <Box className="ball">
                  <Box className="ball-text">-2</Box>
                </Box>
                <Box className="ball">
                  <Box className="ball-text">-1</Box>
                </Box>
                <Box className="ball">
                  <Box className="ball-text">0</Box>
                </Box>
                <Box className="ball">
                  <Box className="ball-text">1</Box>
                </Box>
                <Box className="ball">
                  <Box className="ball-text">2</Box>
                </Box>
                <Box className="ball">
                  <Box className="ball-text">3</Box>
                </Box>
              </HStack>
            </Box>
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
          </Box>
        </Grid>
      </Box>
    );
  }
}

class Draggable extends Component {
  obj = new DragDrop();

  onDragStart(e) {
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
        onDragStart={this.onDragStart.bind(this)}
        zIndex="0"
      >
        <PublishedServiceForm
          bg={this.props.background}
          orgName={this.props.orgName}
          name={this.props.name}
        />
      </Box>
    );
  }
}

export default withRouter(DragDrop);
