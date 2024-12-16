'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DemographicItem from './DemographicItem';
import ElectionResultsItem from './ElectionResultsItem';
import {  getDistrictPlan, getDemographic, getDBoundary, getDistrictPlanSummary, getDistrictPlanData } from '@/app/api/utils';

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const Plans = ({state, tab, smdEnsemble, mmdEnsemble}) => {
  const [stop, setStop] = useState(false)
  const [ensemble, setEnsemble] = useState('enacted');
  const [districtPlan, setDistrictPlan] = useState('1');
  const [district, setDistrict] = useState('dist-1');
  const [display, setDisplay] = useState('summary');

  const [dplanSummary, setDplanSummary] = useState(
    {
      numDistricts: 5,
      opportunityDistricts: 0,
      threshold: 0,
      safeDistricts: 0,
      partySplit: {democratic: 0, republican: 0},
      electionPreference: "2020 H.O.R.",
      districts: [
        {
          districtNumber: 1,
          population: 300000,
          demographics: {
            asian: 15000,
            black: 90000,
            white: 180000,
            hispanic: 15000
          }
        }
      ]
    }
  );
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
  });

  const [results, setResults] = useState([
    {
      rank: 1,
      name: 'John Doe',
      race: 'White',
      party: 'Democratic',
      votes: 100000,
      percent: 0.66,
      isWinner: true,
    },
    {
      rank: 2,
      name: 'John Doe',
      race: 'White',
      party: 'Republican',
      votes: 50000,
      percent: 0.33,
      isWinner: false,
    }
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
    setEnsemble(e.target.value);
  };

  const selectDistrictPlan = (e) => {
    setDistrictPlan(e.target.value);
  };

  const displayDistrictPlan = (ensemble) => {
    let list = [];
    Object.keys(ensemble).forEach(plan => {
      list.push(<option key={ensemble+plan} value={plan}>{plan} Plan</option>);
    })
    return list;
  }
  const func = async ()=>{
    const data = await getDistrictPlanData("la", "smd", 0)
    setDistrictPlan(data)
    setStop(true)
    const data2= await getDistrictPlanSummary("la", "mmd", 0);
    console.log("Summary", data2)
    console.log(data)
  }
  if(!stop) func()

  const displayResults = () => {
    let list = [];
    results.forEach(candidate => {
      const {rank, name, race, party, votes, percent, isWinner} = candidate;
      list.push(<ElectionResultsItem key={district+rank} rank={rank} name={name} race={race} party={party} votes={votes} percent={percent} isWinner={isWinner} />);
    });
    return list;
  };

  const changeDisplay = (e) => {
    setDisplay(e.target.value);
  };

  useEffect(() => {

    const fetchDistrictPlan = async (state, ensemble, districtPlan) => {
      console.log("fetching db");
      try{
      const data2 = await getDBoundary(state);
      console.log(data2);
      }catch(e){
        console.error(e)
      }
      // setDemographics(data.demographics.totals);
      // setNumDistricts(dplanSummary.numDistricts);
    }

    fetchDistrictPlan(state, ensemble, districtPlan);

  }, [demographics, ensemble, districtPlan, state]);

  return (
    <div className={tab == 'summary' ? 'p-4' : 'hidden'}>
      <div className="panel mb-4">
        <div className="flex justify-between">
          <div className='flex'>
            <div className='setting-dropdown m-1'>
              <span>District Type</span>
              <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectEnsemble}>
                <option value="enacted">Enacted</option>
                <option value="SMD">SMD</option>
                <option value="MMD">MMD</option>
              </select>
            </div>
            <div className='setting-dropdown m-1'>
              <span>District Plan</span>
              <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrictPlan} disabled={ensemble == 'enacted'}>
                {ensemble == 'MMD'? displayDistrictPlan(mmdEnsemble) : displayDistrictPlan(smdEnsemble)}
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
          <ul className='pt-2 text-xs flex'>
            <li className='basis-1/2'>
              <span className='font-semibold'>Number of Districts: </span>
              <span>{dplanSummary.numDistricts}</span>
            </li>
            <li className='basis-1/2'>
              <span className='font-semibold'>Number of Opportunity Districts: </span>
              <span>{dplanSummary.opportunityDistricts}</span>
            </li>
          </ul>
          <ul className='pt-2 text-xs flex'>
            <li className='basis-1/2'>
              <span className='font-semibold'>Threshold for Opportunity District: </span>
              <span>{dplanSummary.threshold * 100}%</span>
            </li>
            <li className='basis-1/2'>
              <span className='font-semibold'>Number of safe Districts: </span>
              <span>{dplanSummary.safeDistricts}</span>
            </li>
          </ul>
          <ul className='pt-2 text-xs flex'>
            <li className='basis-1/2'>
              <span className='font-semibold'>DEM/REP Split: </span>
              <span className='democrats'>{dplanSummary.partySplit.democratic * 100}</span>:<span className='republican'>{dplanSummary.partySplit.republican * 100}</span>
            </li>
            <li className='basis-1/2'>
              <span className='font-semibold'>Election Used: </span>
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
        <div className={display == 'election' ? '' : 'hidden'}>
          <div className='setting-dropdown mt-2'>
            <span>District</span>
            <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
              {listDistrict()}
            </select>
          </div>
          <div className="rounded-lg border-2 border-black mt-2 p-2 shadow-md">
            <table className='w-full text-xs'>
              <thead className='mb-2'>
                <tr>
                  <th className='result-row'>Rank</th>
                  <th className='result-row'>Name</th>
                  <th className='result-row'>Race</th>
                  <th className='result-row'>Party</th>
                  <th className='result-row'>Votes</th>
                  <th className='result-row'>Percentage</th>
                  <th className='result-row'>Winner?</th>
                </tr>
              </thead>
              <tbody>
                {displayResults()}
              </tbody>
            </table>
          </div>
        </div>
        <div className={display == 'plot' ? '' : 'hidden'}>
          test
        </div>
      </div>
    </div>
  )
}

export default Plans