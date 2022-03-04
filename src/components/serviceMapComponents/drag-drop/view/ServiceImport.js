import React, { Component } from "react";
import ReactDOM from "react-dom";

const style = {
  border: "1px solid gray",
  padding: "0.5rem 1rem",
  cursor: "move",
  float: "left",
  position: "relative",
  marginRight: "1rem",
};

class ServiceImport extends Component {
  onMouseDown(e) {
    var elm = document.elementFromPoint(e.clientX, e.clientY);
    if (elm.className !== "resizer") {
      this.props.updateStateDragging(this.props.id, true, "SERVICE");
    }
  }
  onMouseUp(e) {
    this.props.updateStateDragging(this.props.id, false, "SERVICE");
  }
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
    this.props.updateStateDragging(this.props.id, true, "SERVICE");
  }
  onDragEnd(e) {
    this.props.updateStateDragging(this.props.id, false, "SERVICE");
  }
  updateStateResizing(id, isResizing) {
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].isResizing = isResizing;
    
    let newState = Object.assign(this.state, {
      list: list,
    });
    this.setState(newState);
  }
  funcResizing(id, clientX, clientY) {
    let node = ReactDOM.findDOMNode(this.refs["node_" + id]);

    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].width = clientX - node.offsetLeft + 16 / 2;
    list[index].height = clientY - node.offsetTop + 16 / 2;

    let newState = Object.assign(this.state, {
      list: list,
    });
    this.setState(newState);
  }
  render() {
    return (
      <React.Fragment>
        <div 
          className='item'
          ref={"node"}
          style={{
            ...style,
            top: this.props.top,
            left: this.props.left,
            width: this.props.width,
            background: this.props.background,
            backgroundColor: this.props.background,
            color: this.props.dragging ? "#fff" : "#333",
          }}
          draggable={true}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
        >
          {this.props.name}
          <Resizer
          ref={"resizerNode"}
          id={this.props.id}
          isResizing={this.props.isResizing}
          resizerWidth={6}
          resizerHeight={6}
          updateStateResizing={this.props.updateStateResizing}
          funcResizing={this.props.funcResizing}
        />
        </div>
      </React.Fragment>
    );
  }
}
class Resizer extends Component {
  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.removeEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing(this.props.id, true);
  }
  onMouseMove(e) {
    if (this.props.isResizing) {
      this.props.funcResizing(this.props.id, e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if (this.props.isResizing) {
      this.props.updateStateResizing(this.props.id, false);
    }
  }
  render() {
    const style = {
      width: this.props.resizerWidth,
      height: this.props.resizerHeight,
    };
    return (
      <div
        className="resizer"
        style={style}
        onMouseDown={this.onMouseDown.bind(this)}
      ></div>
    );
  }
}

export default ServiceImport;
