import React from 'react'

class Link extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            x1: props.source.x,
            x2: props.target.x,
            y1: props.source.y,
            y2: props.target.y,
            weight: props.weight
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

    componentDidMount(nextProps) {
      var arrow = React.findDomNode(this.refs.arrow)

      arrow.setAttribute('markerWidth', 5)
      arrow.setAttribute('markerHeight', 5)
      arrow.setAttribute('refx', 35)
      arrow.setAttribute('refy', 0)
    }

    render() {
         return (
        <g>
          <defs>
            <marker id="arrow" ref="arrow">
              <path d="M0,-5L10,0L0,5"/>
            </marker>
          </defs>
          <line
            x1={this.state.x1}
            x2={this.state.x2}
            y1={this.state.y1}
            y2={this.state.y2}
            style={{
            "stroke": "#999",
            "strokeOpacity":".6",
            "strokeWidth": Math.sqrt(this.state.weight)*2,
            "marker-end": "url(#arrow)"
            }}/>
        </g>
       )
    }
}

export default Link