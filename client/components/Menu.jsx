'use client'

import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setVisualization, setDistrictPlan, visualization}) => {
  const NV_election_res_data = [
    {
      type: "pie",
      values: [50.1, 47.7],
      labels: ["Democrats", "Republicans"],
      textinfo: "label+percent",
      hole: 0.4, // For a donut chart
      marker: {
        colors: ["#00AEF3", "#E81B23"], // Custom colors
      },
    },
  ];
  const NV_election_res_layout = {
    title: "2020 Primary Election Results",
    height: 400,
    width: 500,
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the entire chart
    plot_bgcolor: 'rgba(0,0,0,0)',
    legend: {
      orientation: "h", // Make legend horizontal
      x: 0.2, // Center the legend horizontally
      y: -0.2, // Position it below the chart
      xanchor: "center", // Align the legend horizontally to the center
      yanchor: "top", // Align the legend vertically to the top of the chart
    },
    margin: {
      l: 50, // Left margin (increase to push the chart more to the left)
      r: 250, // Right margin
      t: 50, // Top margin
      b: 100, // Bottom margin to make space for the legend
    },
    // Shift the pie chart more to the left by modifying domain
    xaxis: {
      domain: [0.2, 1], // The lower the first value, the more the pie chart moves left
    },
  };

  const handleDistricts = (e) => {
    setDisplayDistricts(e.target.checked);
  }

  const handlePrecincts = (e) => {
    setDisplayPrecincts(e.target.checked);
  }

  const handleSelectAll = (e) => {
    setDisplayDistricts(true);
    setDisplayPrecincts(true);
  }
  
  const handleClearAll = (e) => {
    setDisplayDistricts(false);
    setDisplayPrecincts(false);
  }

  const changeVisualization = (e) => {
    setVisualization(e.target.value);
  }

  const handleUncheck = (e) => {
    let checkedRadio = document.querySelector('input[name="visualization"]:checked')
    if (checkedRadio) checkedRadio.checked = false;
    setVisualization(null);
  }

  const changeDistrictPlan = (e) => {
    setDistrictPlan(e.target.value);
  }

  return (
    <div className="menu">
      <div className="menu-sect">
        <h2>Settings</h2>
        <div className="menu-content">
          <h3>Boundaries</h3>
          <div className="setting-field">
            <div className="input-sets">
              <input type="checkbox" name="setting" value="districts" id="display-districts" onChange={handleDistricts} checked={displayDistricts} />
              <label htmlFor="display-districts"> Display Districts</label>
            </div>
            <div className="input-sets">
              <input type="checkbox" name="setting" value="precincts" id="display-precincts" onChange={handlePrecincts} checked={displayPrecincts} />
              <label htmlFor="display-precincts"> Display Precincts</label>
            </div>
            <div className="setting-btns">
              <button onClick={handleSelectAll}>Select All</button>
              <button type="reset" onClick={handleClearAll}>Clear All</button>
            </div>
          </div>
          <h3>Visualization</h3>
          <div className="setting-field">
            <div className="input-sets">
              <input type="radio" name="visualization" value="election-results" id="election-results" onChange={changeVisualization}/>
              <label htmlFor="election-results"> Election Results</label>
            </div>
            <select name="demographic" id="demographic" onChange={changeVisualization}>
              <option value={null}>Select Demographic</option>
              <option value="white">White Population</option>
              <option value="Black">Black Population</option>
              <option value="Hispanic">Hispanic Population</option>
              <option value="asian">Asian Population</option>
              <option value="other">Other Population</option>
            </select>
            <div className="setting-btns">
              <button onClick={handleUncheck}>Clear</button>
            </div>
          </div>
          <h3>District Plan</h3>
          <div className="setting-field">
            <div className="input-sets">
              <input type="radio" name="district-plan" value="current-plan" id="current-plan" onChange={changeDistrictPlan} defaultChecked={true} />
              <label htmlFor="current-plan"> SMD Plan</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="district-plan" id="MMD-plan" value="MMD-plan" onChange={changeDistrictPlan} />
              <label htmlFor="MMD-plan"> MMD Plan</label>
            </div>
          </div>
        </div>
      </div>
      <div className="legend-container">
        <div className="legend line-legend" style={{'display': !visualization ? 'flex' : 'none'}}>
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

export default Menu
