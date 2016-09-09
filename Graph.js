import React from 'react'
import Radium from 'radium'
import Node from './Node'
import Link from './Link'

import UserActionCreators from '../../actions/UserActionCreators'
import UserStore from '../../stores/UserStore'

class Graph extends React.Component {
    constructor(props){
        super(props)
        var svgWidth = 900;
        var svgHeight = 900;
        var depthColoring = {
            0: "1F77B4",
            1: "FF7F0E",
            2: "#32CD32",
            3: "#008B8B"
        }

        var force = d3.layout.force()
          .charge(-500)
          .linkDistance(200)
          .size([svgWidth, svgHeight]);

        this.state =  {
          loading: false,
          colors: depthColoring,
          svgWidth: svgWidth,
          svgHeight: svgHeight,
          force: force,
          graphDepth: "2",
          links: [],
          nodes: []
        }
    }

    init_graph(){
        this.state.force
           .nodes(this.state.nodes)
           .links(this.state.links)
           .start()

        this.setState({loading: false})
    }

    componentWillReceiveProps(nextProps) {
      this.setState({id: nextProps.id}, ()=>{
         this.get_related_users(this.init_graph)
         this.state.force.on("tick", (tick, b, c) => {
           this.forceUpdate()
         })
      })
    }

    get_related_users(callback){
        this.setState({loading: true})
        UserActionCreators.get_related_users({ id: this.state.id, depth: this.state.graphDepth, callback: fs =>{
            this.setState({ nodes: fs.nodes, links: fs.links }, callback)
        }})
    }

    update_user_graph(){
        this.setState({graphDepth: this.refs.depth.value}, ()=> this.get_related_users(this.init_graph))
    }

    drawLegend() {
         var keys = Object.keys(this.state.colors).map((key)=>{
             return (<g key={key}>
                 <circle
                  r={5}
                  cx="12"
                  cy={20 + (parseInt(key) * 20)}
                  style={{
                    "fill": this.state.colors[key],
                    "stroke":"#fff",
                    "strokeWidth":"1.5px"
                  }}/>
                // SVG text value is giving a warning. This issue was reported to Reactjs.
                <text x="22" y={20 + (parseInt(key) * 20)}
                      text-anchor="middle" stroke-width="2px" dy=".3em">
                      Depth {key}
                </text>
             </g>)
         })
         return (<g>{keys}</g>)
    }

    setDragAction(){
        d3.selectAll(".graph-node")
            .call(
                d3.behavior.drag()
                .on("dragstart", ()=>{
                    this.state.force.stop()
                })
                .on("drag", (d,i)=>{
                    this.state.nodes[i].x = Math.min(this.state.svgWidth, d3.event.x)
                    this.state.nodes[i].y = Math.min(this.state.svgHeight, d3.event.y)
                    this.setState({ nodes: this.state.nodes }, ()=>{
                        this.forceUpdate();
                    })
                })
                .on("dragend", ()=>{
                    this.state.force.resume()
                }))
    }

    drawLinks() {
      var links = this.state.links.map(function (link, index) {
        return (<Link key={index} source={link.source} target={link.target} weight={link.weight} key={index} />)
      })
      return (<g>{links}</g>)
    }

    drawNodes() {
      return this.state.nodes.map((node, index)=>{
        return (<Node key={index} x={node.x} y={node.y} title={node.title} status={node.state}
                    svgWidth={this.state.svgWidth} svgHeight={this.state.svgHeight} color={this.state.colors[node.category]} id={node.id}/>)
      })
    }

    render() {
        return (
            <div style={{"marginLeft": "20px", "fontFamily": "Helvetica"}}>
               <div className='graph-details graph-depth-input'>
                   <div className="col s1">
                       Depth: <input type="number" min="1" max="3" value={this.state.graphDepth} ref="depth"
                                onChange={this.update_user_graph.bind(this)}></input>
                   </div>
               </div>
                <svg
                  style={{"border": "2px solid black", "margin": "20px"}}
                  width={this.state.svgWidth}
                  height={this.state.svgHeight}>
                      <rect x={this.state.svgWidth/2-8} y={this.state.svgHeight/2} width="4" height="10" fill="#333"  opacity="0.2" className={!this.state.loading? 'hidden': 'graph-loading'}>
                        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.1s" dur="0.6s" repeatCount="indefinite" />
                      </rect>
                      <rect x={this.state.svgWidth/2} y={this.state.svgHeight/2} width="4" height="10" fill="#333"  opacity="0.2" className={!this.state.loading? 'hidden': 'graph-loading'}>
                        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                      </rect>
                      <rect x={this.state.svgWidth/2+8} y={this.state.svgHeight/2} width="4" height="10" fill="#333"  opacity="0.2" className={!this.state.loading? 'hidden': 'graph-loading'}>
                        <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.5s" dur="0.6s" repeatCount="indefinite" />
                      </rect>
                      {this.drawLegend()}
                      {this.drawLinks()}
                      {this.drawNodes()}
                      {this.setDragAction()}
                </svg>
            </div>
        )
    }
}

export default Radium(Graph)