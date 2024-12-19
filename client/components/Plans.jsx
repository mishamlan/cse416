'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DemographicItem from './DemographicItem';
import ElectionResultsItem from './ElectionResultsItem';
import {  getDistrictPlan, getDemographic, getDBoundary, getDistrictPlanSummary, getDistrictPlanData } from '@/app/api/utils';

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

/**
 * 
 * plan is available w the function getDistrictPlan(state, type, number)
 * MMD
-----------------
Average MMD Plan : number = 1
Lowest equal population measure : number = 2
Largest number of opportunity districts : number = 3

SMD
-------------------------
Most extreme vote share (Republican) : number = 1
Smallest number of opportunity districts : number = 2
Highest number of Republican safe districts : number = 3
 */

const Plans = ({state, tab, setEnsemble, setDistrictPlan, ensemble, districtPlan, smdPlans, mmdPlans, smdPlanNames, mmdPlanNames}) => {
  const [display, setDisplay] = useState('summary');

  const [dplanSummary, setDplanSummary] = useState({});
  const [demographics, setDemographics] = useState({
    district1: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
    district2: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
    district3: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
    district4: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
    district5: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
    district6: {
      white: 20000,
      asian: 10000,
      hispanic: 10000,
      black: 10000,
      other: 10000,
      total: 60000,
    },
  });

  const [results, setResults] = useState([
    {
      district: 1,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
    {
      district: 2,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
    {
      district: 3,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
    {
      district: 4,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
    {
      district: 5,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
    {
      district: 6,
      winner: 'John Doe',
      winParty: 'DEM',
      winVotes: 100000,
      winPercent: 0.66,
      loser: 'John Doe',
      loseParty: 'REP',
      loseVotes: 50000,
      losePercent: 0.33,
    },
  ]);

  const [curveData, setCurveData] = useState(null);

  const selectDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const listDistrict = () => {
    let list = [];
    for (let i = 1; i <= dplanSummary.numDistricts; i++) {
      list.push(<option key={ensemble+districtPlan+i} value={`dist-${i}`}>District {i}</option>);
    }
    return list;
  }

  const displayDemo = () => {
    let list = [];
    for (const [district, data] of Object.entries(demographics)) {
      const {white, black, asian, hispanic, other, total} = data;
      list.push(<DemographicItem key={district} district={district} total={total} white={white} black={black} asian={asian} hispanic={hispanic} other={other} />);
    };

    return list;
  };

  const selectEnsemble = (e) => {
    const ensType = e.target.value;
    setEnsemble(ensType);
    if (ensType == 'smd') setDistrictPlan(0);
    else setDistrictPlan(Object.keys(mmdPlans)[0]);
  };

  const selectDistrictPlan = (e) => {
    setDistrictPlan(e.target.value);
    console.log(districtPlan)
  };

  const displayDistrictPlan = (plans, planNames) => {
    let list = [];
    Object.keys(plans).forEach(plan => {
      list.push(<option key={plans+plan} value={plan}>{planNames[plan]} Plan</option>);
    })
    return list;
  }

  const displayResults = () => {
    let list = [];
    results.forEach(candidate => {
      const {district, winner, winParty, winVotes, winPercent, loser, loseParty, loseVotes, losePercent} = candidate;
      list.push(<ElectionResultsItem key={district} district={district} winner={winner} winParty={winParty} winVotes={winVotes} winPercent={winPercent} loser={loser} loseParty={loseParty} loseVotes={loseVotes} losePercent={losePercent} />);
    });
    return list;
  };

  const changeDisplay = (e) => {
    setDisplay(e.target.value);
  };

  useEffect(() => {

    // const fetchDistrictPlan = async (state, ensemble, districtPlan) => {
    //   console.log("fetching db");
    //   try{
    //   const data2 = await getDBoundary(state);
    //   console.log(data2);
    //   }catch(e){
    //     console.error(e)
    //   }
    //   // setDemographics(data.demographics.totals);
    //   // setNumDistricts(dplanSummary.numDistricts);
    // }

    // fetchDistrictPlan(state, ensemble, districtPlan);

    // const func = async ()=>{
    //   const data2 = await getDistrictPlanSummary("la", "smd", 0)  //summary for d plan
    //   const data = await getDistrictPlan("la", "smd", 0)  //geojson for d plan
    //   setDplanSummary(data2);
    // }
    // func()

  }, [demographics, ensemble, districtPlan, state]);

  // Simulated seat-share data for Republicans and Democrats
  const voteShare = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const republicanSeatShare = [0, 5, 15, 30, 40, 50, 60, 70, 85, 95, 100];
  const democraticSeatShare = [0, 10, 25, 35, 50, 60, 65, 75, 90, 100, 100];

  // Markers for ensembles
  const smdPlansRep = { vote: 45, seat: 30 };
  const smdPlansDem = { vote: 55, seat: 75 };
  const mmdPlansRep = { vote: 45, seat: 50 };
  const mmdPlansDem = { vote: 55, seat: 65 };

  return (
    <div className={tab == 'plans' ? 'p-4' : 'hidden'}>
      <div className="panel mb-4">
        <div className="flex justify-between">
          <div className='flex'>
            <div className='setting-dropdown m-1'>
              <span>District Type</span>
              <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectEnsemble}>
                <option value="smd">SMD</option>
                <option value="mmd">MMD</option>
              </select>
            </div>
            <div className='setting-dropdown m-1'>
              <span>District Plan</span>
              <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrictPlan} value={districtPlan}>
                {ensemble == 'mmd'? displayDistrictPlan(mmdPlans, mmdPlanNames) : displayDistrictPlan(smdPlans, smdPlanNames)}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='panel'>
        <h2 className='panel-title'>District Plan</h2>
        <ul className="display-tabs">
          <li className="w-full focus-within:z-10">
            <button className={display == 'summary' ? "ensemble-display-selected rounded-s-lg border-r" : 'ensemble-display rounded-s-lg border-r'} value={'summary'} onClick={changeDisplay}>Summary</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={display == 'election' ? "ensemble-display-selected border-r" : "ensemble-display border-r"} value={'election'} onClick={changeDisplay}>Election Results</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={display == 'plot' ? "ensemble-display-selected rounded-e-lg" : "ensemble-display rounded-e-lg"} value={'plot'} onClick={changeDisplay}>Seat-Vote Curves</button>
          </li>
        </ul>
        <div className={display == 'summary' ? '' : 'hidden'}>
          {Object.keys(dplanSummary).length == 0 ? <span>Loading...</span>:
          <div>
            <ul className='pt-2 text-xs flex flex-col'>
              <li className='flex my-1'>
                <span className='font-semibold basis-1/2'>Number of Districts: </span>
                <span>{dplanSummary.number_of_districts}</span>
              </li>
              <li className='flex my-1'>
                <span className='font-semibold basis-1/2'>Number of Opportunity Districts: </span>
                <span>{dplanSummary.opportunity_districts}</span>
              </li>
              <li className='flex my-1'>
                <span className='font-semibold basis-1/2'>Threshold for Opportunity District: </span>
                <span>{dplanSummary.opportunity_threshold}</span>
              </li>
              <li className={ensemble == 'mmd' ? 'hidden' : 'flex my-1'}>
                <span className='font-semibold basis-1/2'>Number of safe Districts: </span>
                <span>{dplanSummary.number_of_districts - dplanSummary.opportunity_districts}</span>
              </li>
              <li className='flex my-1'>
                <span className='font-semibold basis-1/2'>DEM/REP Split: </span>
                <span className='democrats'>{dplanSummary.d_wins}</span>:<span className='republican'>{dplanSummary.r_wins}</span>
              </li>
              <li className='flex my-1'>
                <span className='font-semibold basis-1/2'>Election Used: </span>
                <span>{dplanSummary.electionPreference}</span>
              </li>
            </ul>
            <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-1 bg-gray-100">District</th>
                    <th scope="col" className="px-6 py-1">Total Population</th>
                    <th scope="col" className="px-6 py-1 bg-gray-100">White</th>
                    <th scope="col" className="px-6 py-1">Black</th>
                    <th scope="col" className="px-6 py-1 bg-gray-100">Asian</th>
                    <th scope="col" className="px-6 py-1">Hispanic</th>
                    <th scope="col" className="px-6 py-1 bg-gray-100">Other</th>
                  </tr>
                </thead>
                <tbody>
                  {displayDemo()}
                </tbody>
              </table>
            </div>
          </div>
          }
        </div>
        <div className={display == 'election' ? '' : 'hidden'}>
          <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-1 bg-gray-100">District</th>
                  <th scope="col" className="px-6 py-1">Winner</th>
                  <th scope="col" className="px-6 py-1">Party</th>
                  <th scope="col" className="px-6 py-1">Votes</th>
                  <th scope="col" className="px-6 py-1">Percent</th>
                  <th scope="col" className="px-6 py-1 bg-gray-100">Loser</th>
                  <th scope="col" className="px-6 py-1 bg-gray-100">Party</th>
                  <th scope="col" className="px-6 py-1 bg-gray-100">Votes</th>
                  <th scope="col" className="px-6 py-1 bg-gray-100">Percent</th>
                </tr>
              </thead>
              <tbody>
                {displayResults()}
              </tbody>
            </table>
          </div>
        </div>
        <div className={display == 'plot' ? 'mt-2' : 'hidden'}>
          <Plot
            data={[
              // Republican Curve
              {
                x: voteShare,
                y: republicanSeatShare,
                type: "scatter",
                mode: "lines",
                name: "REP",
                line: { color: "red", width: 2 },
              },
              // Democratic Curve
              {
                x: voteShare,
                y: democraticSeatShare,
                type: "scatter",
                mode: "lines",
                name: "DEM",
                line: { color: "blue", width: 2 },
              },
              // Republican Marker
              {
                x: [smdPlansRep.vote],
                y: [smdPlansRep.seat],
                type: "scatter",
                mode: "markers",
                name: "SMD REP",
                marker: { color: "orange", size: 10, symbol: "circle" },
              },
              {
                x: [mmdPlansRep.vote],
                y: [mmdPlansRep.seat],
                type: "scatter",
                mode: "markers",
                name: "MMD REP",
                marker: { color: "red", size: 10, symbol: "circle" },
              },
              // Democratic Marker
              {
                x: [smdPlansDem.vote],
                y: [smdPlansDem.seat],
                type: "scatter",
                mode: "markers",
                name: "SMD DEM",
                marker: { color: "purple", size: 10, symbol: "circle" },
              },
              {
                x: [mmdPlansDem.vote],
                y: [mmdPlansDem.seat],
                type: "scatter",
                mode: "markers",
                name: "MMD DEM",
                marker: { color: "blue", size: 10, symbol: "circle" },
              },
            ]}
            layout={{
              width: 700,
              height: 450,
              xaxis: {
                title: { text: "Vote Share (%)"},
                range: [0, 100],
              },
              yaxis: {
                title: { text: "Seat Share (%)"},
                range: [0, 100],
              },
              showlegend: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Plans