'use client'

import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({setDisplayLayer, setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setVisualization, setDistrictPlan, visualization, districtPlan}) => {
  // const NV_election_res_data = [
  //   {
  //     type: "pie",
  //     values: [50.1, 47.7],
  //     labels: ["Democrats", "Republicans"],
  //     textinfo: "label+percent",
  //     hole: 0.4, // For a donut chart
  //     marker: {
  //       colors: ["#00AEF3", "#E81B23"], // Custom colors
  //     },
  //   },
  // ];
  // const NV_election_res_layout = {
  //   title: "2020 Primary Election Results",
  //   height: 400,
  //   width: 500,
  //   paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the entire chart
  //   plot_bgcolor: 'rgba(0,0,0,0)',
  //   legend: {
  //     orientation: "h", // Make legend horizontal
  //     x: 0.2, // Center the legend horizontally
  //     y: -0.2, // Position it below the chart
  //     xanchor: "center", // Align the legend horizontally to the center
  //     yanchor: "top", // Align the legend vertically to the top of the chart
  //   },
  //   margin: {
  //     l: 50, // Left margin (increase to push the chart more to the left)
  //     r: 250, // Right margin
  //     t: 50, // Top margin
  //     b: 100, // Bottom margin to make space for the legend
  //   },
  //   // Shift the pie chart more to the left by modifying domain
  //   xaxis: {
  //     domain: [0.2, 1], // The lower the first value, the more the pie chart moves left
  //   },
  // };

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

  const changeDisplay = (e) => {
    setDisplayLayer(e.target.value);
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
          <button className="input-sets" style={{'backgroundColor': visualization == 'none' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'none'}>None</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'election-results' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'election-results'}>Election Results</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'white-population' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'white-population'}>White Population</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'black-population' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'black-population'}>Black Population</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'hispanic-population' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'hispanic-population'}>Hispanic Population</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'asian-population' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'asian-population'}>Asian Population</button>
          <button className="input-sets" style={{'backgroundColor': visualization == 'other-population' ? '#dddddd' : '#ffffff'}} onClick={changeVisualization} value={'other-population'}>Other Population</button>
        </div>
        <h3>District Plans</h3>
        <div className="setting-field">
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'current' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'current'}>Current SMD Plan</button>
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'smd1' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'smd1'}>SMD Plan 1</button>
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'smd2' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'smd2'}>SMD Plan 2</button>
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'smd3' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'smd3'}>SMD Plan 3</button>
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'smd4' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'smd4'}>SMD Plan 4</button>
          <button className="input-sets" style={{'backgroundColor': districtPlan == 'mmd' ? '#dddddd' : '#ffffff'}} onClick={changeDistrictPlan} value={'mmd'}>MMD Plan</button>


          {/* <div className="input-sets">
            <input type="radio" name="district-plan" value="current-plan" id="current-plan" onChange={changeDistrictPlan} defaultChecked={true} />
            <label htmlFor="current-plan"> SMD Plan</label>
          </div>
          <div className="input-sets">
            <input type="radio" name="district-plan" id="MMD-plan" value="MMD-plan" onChange={changeDistrictPlan} />
            <label htmlFor="MMD-plan"> MMD Plan</label>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Menu
