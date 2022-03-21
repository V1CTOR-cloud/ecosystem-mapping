import React, { Component } from 'react'

export default class Item extends Component {
    
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state={
            top:this.props.item.top,
            left:this.props.item.left
        }
    }

    handleDragStart=(e)=>{
       
        const node = this.myRef.current;
        const x = e.pageX - node.offsetTop;
        const y = e.pageY - node.offsetLeft;
        this.setState({
            top:y,
            left:x
        })
    }
    render() {
        return (
            <div ref={this.myRef} onDragStart={(e)=>this.handleDragStart(e)} draggable={true} 
            style={{background:'tomato',
            color:'#fff',
            fontWeight:'bold',
            padding:'5px',
            border:'1px solid #fff',
            height:'auto',
            width:'80px','textAlign':'center',
            position:'absolute',
            top:this.state.top,
            left:this.state.left
            }}>
                {this.props.item.label}
            </div>
        )
    }
}
 
