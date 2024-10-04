'use client'

import Plot from 'react-plotly.js'
import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({isMenu, stateSelect, setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setVisualization, setDistrictPlan}) => {
  const [menuTab, setMenuTab] = useState('tab1');
  const [demographic, setDemographic] = useState('African-American'); 

  const states= {
    NV:[
      "Districts: 4",
      "Precincts: 2200",
      "Democrats: 50.06",
      "Republicans: 27.67",
    ],
    LA:[
      "Districts: -1",
      "Precincts: -1",
      "Democrats: -1",
      "Republicans: -1",
    ]
  }
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


  // SMD Data
  const smdData = [
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' }
  ];

  // MMD Data
  const mmdData = [
    { y: [25, 30, 35], name: 'District 1', type: 'box' },
    { y: [50, 55, 60], name: 'District 2', type: 'box' },
    { y: [60, 65, 70], name: 'District 3', type: 'box' },
    { y: [75, 80, 85], name: 'District 4', type: 'box' }
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
            <div className="input-sets">
              <input type="radio" name="visualization" value="demographic" id="demographic" onChange={changeVisualization}/>
              <label htmlFor="demographic"> Demographic</label>
            </div>
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
          <h3>
            State: {stateSelect}
          </h3>
          <p>
            Number of  {stateSelect== "LA" ? states.LA[0] : states.NV[0]}
          </p>
          <p>
            Number of  {stateSelect== "LA" ? states.LA[1] : states.NV[1]}
          </p>
          <br />
          <table>
            <caption>Election Results</caption>
            <thead>
              <tr>
                <th>Party</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Democrats</td>
                <td>{stateSelect== "LA" ? states.LA[0] : states.NV[0]}</td>
              </tr>
              <tr>
                <td>Republican</td>
                <td>empty</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table>
            <caption>Demographic</caption>
            <thead>
              <tr>
                <th>Race</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>White</td>
                <td>empty</td>
              </tr>
              <tr>
                <td>Black</td>
                <td>empty</td>
              </tr>
              <tr>
                <td>Hispanic</td>
                <td>empty</td>
              </tr>
              <tr>
                <td>Asian</td>
                <td>empty</td>
              </tr>
              <tr>
                <td>Others</td>
                <td>empty</td>
              </tr>
            </tbody>
          </table>
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
            <option value="Pacific Islander">Pacific Islander</option>
            <option value="Other">Other</option>
          </select>
            <Plot
              data={smdData}
              layout={{ 
                title: 'SMD - Box and Whisker Plot', 
                yaxis: { 
                  title: 'Percentage (%)', 
                  range: [0, 100], // Set y-axis range from 0 to 100
                  dtick: 10        // Set y-axis ticks to increment by 10
                }, 
                width: 380 
              }}
            />

            <Plot
              data={mmdData}
              layout={{ 
                title: 'MMD - Box and Whisker Plot', 
                yaxis: { 
                  title: 'Percentage (%)', 
                  range: [0, 100], // Set y-axis range from 0 to 100
                  dtick: 10        // Set y-axis ticks to increment by 10
                }, 
                width: 380 
              }}
            />
            <p>MMD shows increased repersentation for {demographic} across all districts</p>
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
