'use client'

import { useContext } from "react"
import {HeaderContext} from '@/app/layout';
import Map from "@/components/Map"

const Home = () => {

  let {visualization} = useContext(HeaderContext);

  return (
    <div>
      <Map />
      <div className="legend-container">
        <div className="legend line-legend" style={{'display': !visualization ? 'flex' : 'none'}}>
          <div><div id="black-line"></div> : State</div>
          <div><div id="green-line"></div> : District</div>
          <div><div id="purple-line"></div> : Precinct</div>
        </div>
        <div className="legend election-legend" style={{'display': visualization == "election-results" ? 'flex' : 'none'}}>
          election legend
        </div>
        <div className="legend demo-legend" style={{'display': visualization == "demographic" ? 'flex' : 'none'}}>
          <div>
            <div style={{'background-color':"#bdbdbd", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'background-color':"#f7fbff", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'background-color':"#deebf7", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'background-color':"#c6dbef", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'background-color':"#9ecae1", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
          </div>
          <div>
            <div style={{'padding':"6px 0px"}}></div>
            <div style={{'padding':"6px 0px"}}>1000</div>
            <div style={{'padding':"6px 0px"}}>2000</div>
            <div style={{'padding':"6px 0px"}}>10000</div>
            <div style={{'padding':"6px 0px"}}>50000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
