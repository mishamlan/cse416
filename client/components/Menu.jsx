'use client'

import Plot from 'react-plotly.js'
import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({isMenu, stateSelect, setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setVisualization, setDistrictPlan}) => {
  const [menuTab, setMenuTab] = useState('tab1');
  const [demographic, setDemographic] = useState('African-American'); 
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
  const dummy_districts = ['District 1', 'District 2', 'District 3', 'District 4'];
  const racialIdentities = ['White', 'Black', 'Asian', 'Hispanic', 'Other']; // Fixed the naming and ensured 6 identities
  const dummy_populationData = {
    'District 1': [50000, 30000, 15000, 20000, 4000],
    'District 2': [40000, 35000, 20000, 25000, 4000],
    'District 3': [60000, 20000, 10000, 30000, 4000],
    'District 4': [45000, 25000, 15000, 25000, 4000],
  };

  const NV_traces = racialIdentities.map((identity, index) => {
    return {
      x: dummy_districts,
      // Corrected line
      y: dummy_districts.map(district => dummy_populationData[district][index]),
      type: 'bar',
      name: identity,
    };
  });

  const NV_demographic_layout = {
    title: "Population by Racial Identity across Districts",
    xaxis: {
      title: "Districts",
    },
    yaxis: {
      title: "Population",
    },
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the entire chart
    plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the plot area
    height: 400,
    width: 400,
    legend: {
      orientation: "h", // Make legend horizontal
      x: 0.5, // Center the legend horizontally
      y: -0.5, // Position it below the chart
      xanchor: "center", // Align the legend horizontally to the center
      yanchor: "top", // Align the legend vertically to the top of the chart
    },
    barmode: 'stack', // Stacked bars for better visibility
  };
  const handleClickTab = (e) => {
    let tab = e.target.id;
    setMenuTab(tab);
  }

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

  const compareComponent = () => {
    const [demographic, setDemographic] = useState('African-American');
  }


  // boxwhister data
  const boxwhisker = [
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
    { y: [45, 55, 65], name: 'Multi-Member District', type: 'box' }

  ];


  return (
    <div className="menu" style={{'display': isMenu ? 'block' : 'none'}}>
      <div className="tab-bar">
        <button className="tab" id="tab1" onClick={handleClickTab} style={{'backgroundColor': menuTab == 'tab1' ? 'white' : '#DDDDDD'}} >Setting</button>
          <button className="tab" id="tab2" onClick={handleClickTab} style={{'backgroundColor': menuTab == 'tab2' ? 'white' : '#DDDDDD'}} >Summary</button>
          <button className="tab" id="tab3" onClick={handleClickTab} style={{'backgroundColor': menuTab == 'tab3' ? 'white' : '#DDDDDD'}} >Compare</button>
          <button className="tab" id="tab4" onClick={handleClickTab} style={{'backgroundColor': menuTab == 'tab4' ? 'white' : '#DDDDDD'}} ></button>
      </div>
      <div className="menu-content">
        <div className="setting" style={{'display': menuTab == 'tab1' ? 'block' : 'none'}} >
          <h2>Boundaries</h2>
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
          <h2>Visualization</h2>
          <div className="setting-field">
            <div className="input-sets">
              <input type="radio" name="visualization" value="election-results" id="election-results" onChange={changeVisualization}/>
              <label htmlFor="election-results"> Election Results</label>
            </div>
            {/* <div className="input-sets">
              <input type="radio" name="visualization" value="white" id="white" onChange={changeVisualization}/>
              <label htmlFor="white"> White Population</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="visualization" value="black" id="black" onChange={changeVisualization}/>
              <label htmlFor="black"> Black Population</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="visualization" value="hispanic" id="hispanic" onChange={changeVisualization}/>
              <label htmlFor="hispanic"> Hispanic Population</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="visualization" value="asian" id="asian" onChange={changeVisualization}/>
              <label htmlFor="asian"> Asian Population</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="visualization" value="other" id="other" onChange={changeVisualization}/>
              <label htmlFor="other"> Other Population</label>
            </div> */}
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
          <h2>District Plan</h2>
          <div className="setting-field">
            <div className="input-sets">
              <input type="radio" name="district-plan" value="current-plan" id="current-plan" onChange={changeDistrictPlan} defaultChecked={true} />
              <label htmlFor="current-plan"> Current Plan</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="district-plan" id="MMD-plan" value="MMD-plan" onChange={changeDistrictPlan} />
              <label htmlFor="MMD-plan"> MMD Plan</label>
            </div>
          </div>
        </div>
        <div className="summary" style={{'display': menuTab == 'tab2' ? 'block' : 'none'}} >
          {/* <Plot data={NV_election_res_data} layout={NV_election_res_layout} config={{displayModeBar: false}}/> */}
          <Plot data={NV_traces} layout={NV_demographic_layout} config={{displayModeBar: false}}/>
        </div>
        <div className="Compare" style={{'display': menuTab == 'tab3' ? 'block' : 'none'}} >
          <p style={{ marginBottom: '20px' }}>This section provides graphics to compare the the results of an SMD election and MMD election </p>

          <h3>Box and Whisker Analysis</h3>

          <select
            style={{ marginBottom: '20px' }}
            value={demographic}
            onChange={(e) => setDemographic(e.target.value)}
          >
            <option value="White">White</option>
            <option value="African-American">African-American</option>
            <option value="Asian">Asian</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Others">Others</option>
          </select>
            <Plot
              data={boxwhisker}
              layout={{ 
                title: 'SMDs vs MMD Distribution of Race', 
                yaxis: { 
                  title: 'Percentage (%)', 
                  range: [0, 100],
                  dtick: 10        
                }, 
                width: 380,
                showlegend: false
              }}
            />

        </div>
        <div className="Infographic" style={{'display': menuTab == 'tab4' ? 'block' : 'none'}} >
        <h3>What is the Fair Representation Act</h3>
<p>H.R. 7740, also known as the Fair Representation Act, is legislation created to change how the U.S. House of Representatives elections are conducted. The goal of the bill is to ensure a more equitable electoral process, replacing the winner-takes-all system with a ranked-choice voting system and multi-member congressional districts. It seeks to overhaul the electoral system by changing how congressional districts are drawn and how votes are cast.</p>
<ul>
    <li>The bill promotes larger congressional districts represented by multiple members, replacing single-member districts.</li>
    <li>It introduces ranked-choice voting, where voters rank candidates by preference, promoting consensus candidates and reducing negative campaigning.</li>
    <li>The bill requires independent commissions to draw district boundaries, aiming to eliminate gerrymandering.</li>
    <li>The system should make it so that the percentage of votes a party receives is more closely aligned with the number of seats they win in the House.</li>
    <li>The bill targets systemic reforms to address polarization and the lack of fair representation in current congressional elections.</li>
    <li>Independent redistricting commissions would follow strict guidelines to ensure fairness and public accountability in how districts are drawn.</li>
</ul>

<br></br>
<h4>Louisiana</h4>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque unde nihil magnam obcaecati dolor quo, vitae eius quidem, ipsa doloribus eaque itaque expedita voluptate voluptates esse libero facere porro voluptatum.</p>
    <br></br>
    <h4>Nevada</h4>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque unde nihil magnam obcaecati dolor quo, vitae eius quidem, ipsa doloribus eaque itaque expedita voluptate voluptates esse libero facere porro voluptatum.</p>
    
        </div>
      </div>
    </div>
  )
}

export default Menu
