import React from 'react'

class Link extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            x1: props.source.x,
            x2: props.target.x,
            y1: props.source.y,
            y2: props.target.y,
            value: props.source.weight
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
            x1: nextProps.source.x,
            x2: nextProps.target.x,
            y1: nextProps.source.y,
            y2: nextProps.target.y
      });
    }

    render() {
         return (
              <line
                x1={this.state.x1}
                x2={this.state.x2}
                y1={this.state.y1}
                y2={this.state.y2}
                style={{
                  "stroke": "#999",
                  "strokeOpacity":".6",
                  "strokeWidth": Math.sqrt(this.state.value)
                }}/>
       )
    }
}

export default Link