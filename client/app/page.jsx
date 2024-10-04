'use client'

import { useContext } from "react"
import {HeaderContext} from '@/app/layout';
import Map from "@/components/Map"

const Home = () => {

  let {visualization} = useContext(HeaderContext);

  return (
    <div>
      <Map />
      <div className="legend">
        <div className="line-legend" style={{'display': !visualization ? 'flex' : 'none'}}>
          <div><div id="black-line"></div> : State</div>
          <div><div id="green-line"></div> : District</div>
          <div><div id="purple-line"></div> : Precinct</div>
        </div>
        <div className="election-legend" style={{'display': visualization == "election-results" ? 'flex' : 'none'}}>
          election legend
        </div>
        <div className="demo-legend" style={{'display': visualization == "demographic" ? 'flex' : 'none'}}>
          demographic legend
        </div>
      </div>
    </div>
  )
}

export default Home
