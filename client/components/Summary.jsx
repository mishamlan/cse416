'use client'

import { useState, useEffect } from 'react'
import DemographicItem from './DemographicItem';
import ElectionResultsItem from './ElectionResultsItem';
import {  getDistrictPlan, getEnsembleSummary } from '@/app/api/utils';

const Summary = ({state, tab, setNumDistricts, smdEnsemble, mmdEnsemble}) => {

  const [ensemble, setEnsemble] = useState('enacted');
  const [districtPlan, setDistrictPlan] = useState('1');
  const [district, setDistrict] = useState('dist-1');

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
    white: 20000,
    Asian: 10000,
    Hispanic: 10000,
    Black: 10000,
    Others: 10000,
    Total: 60000,
  });
  const [population, setPopulation] = useState(0);

  const [results, setResults] = useState([
    {
      rank: 1,
      name: 'John Doe',
      party: 'Democratic',
      votes: 100000,
      percent: 0.66,
      isWinner: true,
    },
    {
      rank: 2,
      name: 'John Doe',
      party: 'Republican',
      votes: 50000,
      percent: 0.33,
      isWinner: false,
    }
  ]);

  const selectSummary = (e) => {
    setSummary(e.target.value);
  };

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
    for (const [race, vap] of Object.entries(demographics)) {
      list.push(<DemographicItem key={district+race} race={race} vap={vap} />);
    }
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

  const displayResults = () => {
    let list = [];
    results.forEach(candidate => {
      const {rank, name, party, votes, percent, isWinner} = candidate;
      list.push(<ElectionResultsItem key={district+rank} rank={rank} name={name} party={party} votes={votes} percent={percent} isWinner={isWinner} />);
    });
    return list;
  };

  useEffect(() => {
    const calcTotalPopulation = () => {
      let count = 0;
      for (const [race, vap] of Object.entries(demographics)) {
        count += vap;
      }
      setPopulation(count);
    }
    calcTotalPopulation();

    const fetchDistrictPlan = async (state, ensemble, districtPlan) => {
      /*
      Expected:
      {
        numDistricts: int,
        opportunityDistricts: int,
        threshold: int,
        safeDistricts: int,
        partySplit: {democratic: int, republican: int},
        electionPreference: string,
        districts: [
          {
            districtNumber: int
            population: int,
            demographics: {
              white: int,
              black: int,
              hispanic: int,
              asian: int,
              others: int,
            }
          }
        ],
      }
      */
      const data = await getDistrictPlan(state, ensemble, districtPlan);
      setDemographics(data.demographics.totals);
      setNumDistricts(dplanSummary.numDistricts);
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
            <div className='setting-dropdown m-1'>
              <span>District</span>
              <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
                {listDistrict()}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='district-plan-summary panel'>
        <h2 className='panel-title'>District Plan Summary</h2>
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
            <span className='font-semibold'>Party Split: </span>
            <span className='democrats'>{dplanSummary.partySplit.democratic * 100}</span>:<span className='republican'>{dplanSummary.partySplit.republican * 100}</span>
          </li>
        </ul>
        <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-1 bg-gray-100">Total Population</th>
                <th scope="col" className="px-6 py-1">White</th>
                <th scope="col" className="px-6 py-1 bg-gray-100">Black</th>
                <th scope="col" className="px-6 py-1">Asian</th>
                <th scope="col" className="px-6 py-1 bg-gray-100">Hispanic</th>
                <th scope="col" className="px-6 py-1">Others</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-1 bg-gray-100">{demographics.Total.toLocaleString()}</td>
                <td className="px-6 py-1">{demographics.white.toLocaleString()}</td>
                <td className="px-6 py-1 bg-gray-100">{demographics.Black.toLocaleString()}</td>
                <td className="px-6 py-1">{demographics.Asian.toLocaleString()}</td>
                <td className="px-6 py-1 bg-gray-100">{demographics.Hispanic.toLocaleString()}</td>
                <td className="px-6 py-1">{demographics.Others.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className="flex-col text-sm panel mt-4">
        <h2 className='panel-title mb-2'>Election Results</h2>
        <div className="rounded-lg border-2 border-black p-2 shadow-md">
          <table>
            <thead className='mb-2'>
              <tr>
                <th className='px-8'>Rank</th>
                <th className='px-8'>Name</th>
                <th className='px-8'>Party</th>
                <th className='px-8'>Votes</th>
                <th className='px-8'>Percentage</th>
                <th className='px-8'>Winner?</th>
              </tr>
            </thead>
            <tbody>
              {displayResults()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Summary