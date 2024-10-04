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
        <div className="legend demo-legend" style={{'display': visualization == "white"? 'flex' : 'none'}}>
          <div>
            <div style={{'backgroundColor':"#fff7e5", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#ffe4c9", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#fcd0a1", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#fcae6b", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#fe8d3b", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#f16913", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
            <div style={{'backgroundColor':"#d84801", 'height':'30px', 'width':'30px', 'display':'inline-block'}}></div>
          </div>
          <div>
            <div style={{'padding':"6px 0px"}}></div>
            <div style={{'padding':"6px 0px"}}>1000</div>
            <div style={{'padding':"6px 0px"}}>2000</div>
            <div style={{'padding':"6px 0px"}}>5000</div>
            <div style={{'padding':"6px 0px"}}>10000</div>
            <div style={{'padding':"6px 0px"}}>20000</div>
            <div style={{'padding':"6px 0px"}}>50000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
