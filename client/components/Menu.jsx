'use client'

import Plot from 'react-plotly.js'
import { useState } from 'react'
import '@/styles/Menu.css'

const Menu = ({isMenu, stateSelect, setDisplayDistricts, setDisplayPrecincts, displayDistricts, displayPrecincts, setChoropleth, setDistrictPlan}) => {
  const [menuTab, setMenuTab] = useState('tab1');

  const handleClickTab = (e) => {
    let tab = e.target.id;
    setMenuTab(tab);
  }

  const handleDistricts = (e) => {
    if (stateSelect == "N/A") {
      alert('Please Select a state first.')
      return;
    }
    setDisplayDistricts(e.target.checked);
  }

  const handlePrecincts = (e) => {
    if (stateSelect == "N/A") {
      alert('Please Select a state first.')
      return;
    }
    setDisplayPrecincts(e.target.checked);
  }

  const handleSelectAll = (e) => {
    if (stateSelect == "N/A") {
      alert('Please Select a state first.')
      return;
    }
    setDisplayDistricts(true);
    setDisplayPrecincts(true);
  }
  
  const handleClearAll = (e) => {
    setDisplayDistricts(false);
    setDisplayPrecincts(false);
  }

  const changeChoropleth = (e) => {
    setChoropleth(e.target.value);
  }

  const handleUncheck = (e) => {
    let checkedRadio = document.querySelector('input[name="choropleth"]:checked')
    if (checkedRadio) checkedRadio.checked = false;
    setChoropleth(null);
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
          <h2>Choropleth</h2>
          <div className="setting-field">
            <div className="input-sets">
              <input type="radio" name="choropleth" value="election-results" id="election-results" onChange={changeChoropleth}/>
              <label htmlFor="election-results"> Election Results</label>
            </div>
            <div className="input-sets">
              <input type="radio" name="choropleth" value="minority-population" id="minority-population" onChange={changeChoropleth}/>
              <label htmlFor="minority-population"> Minority Population</label>
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
            Number of Districts: 
          </p>
          <p>
            Number of Precincts: 
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
                <td>empty</td>
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
      </div>
    </div>
  )
}

export default Menu