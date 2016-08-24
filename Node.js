import React from 'react'

class Node extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            x: props.x,
            y: props.y,
            category: props.category,
            color: d3.scale.category20(props.category)
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        title: nextProps.title,
        x: nextProps.x,
        y: nextProps.y,
        category: nextProps.category,
        color: d3.scale.category20(nextProps.category)
      });
    }

    render() {
         return (
            <g>
              <rect
                ry="20"
                rx="50"
                x={this.state.x - 10}
                y={this.state.y - 15}
                width="100"
                height="30"/>
              <text x={this.state.x} y={this.state.y} text-anchor="middle" stroke-width="2px" dy=".3em">{this.state.title}</text>
            </g>
       )
    }
}

export default Node