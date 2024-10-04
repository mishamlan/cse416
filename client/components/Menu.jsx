'use client'

import Plot from 'react-plotly.js'
import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({isMenu, stateSelect, setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setVisualization, setDistrictPlan}) => {
  const [menuTab, setMenuTab] = useState('tab1');
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
          <Plot 
            data={[]}
            layout={{title: 'Seat Distribution', barmode: 'stack', width: 380}}
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
