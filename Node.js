import React from 'react'
import { hashHistory } from 'react-router'

class Node extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            svgWidth: props.svgWidth,
            svgHeight: props.svgHeight,
            id: props.id,
            status: props.status,
            title: props.title,
            x: 0,
            y: 0,
            color: props.color
        }
    }

    statusColor(){
        if(this.state.status=="LOCKED") return "red"
        return "black"
    }

    goToUser(){
        hashHistory.push('/user/' + this.state.id)
        window.location.reload()
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        svgWidth: nextProps.svgWidth,
        svgHeight: nextProps.svgHeight,
        id: nextProps.id,
        title: nextProps.title,
        x: nextProps.x,
        y: nextProps.y,
        color: nextProps.color,
        status: nextProps.status
      });
    }

    render() {
         return (
            <g className="graph-node" ref={this.state.title}>
             <circle
                r={5}
                cx={this.state.x}
                cy={this.state.y}
                style={{
                  "fill": this.state.color,
                  "stroke":"#fff",
                  "strokeWidth":"1.5px"
                }}/>
              // SVG text value is giving a warning. This issue was reported to Reactjs.
              <text x={this.state.x + 6} y={this.state.y}  onClick={this.goToUser.bind(this)}
                    text-anchor="middle" stroke-width="2px" dy=".3em" style={{ "fill": this.statusColor()}}>
                    {this.state.title}
              </text>
            </g>
       )
    }
}

export default Node