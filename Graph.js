import React from 'react'
import Radium from 'radium'
import Node from './Node'
import Link from './Link'

class Graph extends React.Component {
    constructor(props){
        super(props)
        var svgWidth = 900;
        var svgHeight = 900;
        var force = d3.layout.force()
          .charge(-120)
          .linkDistance(200)
          .size([svgWidth, svgHeight]);

        this.state =  {
          svgWidth: svgWidth,
          svgHeight: svgHeight,
          force: force,
          data: { links: [], nodes: [] }
        }
    }

    componentWillMount () {
        this.state.force.on("tick", (tick, b, c) => {
          this.forceUpdate()
        })
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
            data: nextProps.data
      }, function(){
        this.state.force
            .nodes(this.state.data.nodes)
            .links(this.state.data.links)
            .start()
            console.log()
      });
    }

    drawLinks() {
      var links = this.state.data.links.map(function (link, index) {
        return (<Link source={link.source} target={link.target} key={index} />)
      })
      return (<g>{links}</g>)
    }

    drawNodes() {
      return this.state.data.nodes.map(function (node, index) {
        return (<Node key={index} x={node.x} y={node.y} title={node.title} category={node.category}/>)
      })
    }

    render() {
        return (
            <div style={{"marginLeft": "20px", "fontFamily": "Helvetica"}}>
            <svg
              style={{"border": "2px solid black", "margin": "20px"}}
              width={this.state.svgWidth}
              height={this.state.svgHeight}>
              {this.drawLinks()}
              {this.drawNodes()}
            </svg>
          </div>
        )
    }
}

export default Radium(Graph)