'use client'

import { useState, useEffect } from 'react'
import DemographicItem from './DemographicItem';
import { getEnsembleSummary, getDistrictPlan, getDemographic } from '@/app/api/utils';

const Summary = ({state, tab, ensemble, districtPlan}) => {

  const [display, setDisplay] = useState('ensemble');
  const [district, setDistrict] = useState('dist-1');
  const [racialData, setracialData] = useState(null);

  const [ensembleSummary, setEnsembleSummary] = useState({
    numDistrictPlans: 5000,
    avgMinorityReps: 2.5,
    avgEqualPopulationMeasure: 0.98,
    avgPartySplit: {democratic: 0.47, republican: 0.53},
  });
  const [dplanSummary, setDplanSummary] = useState(
    {
      numDistricts: 4,
      opportunityDistricts: 2,
      threshold: 20000,
      safeDistricts: 2,
      partySplit: {democratic: 52, republican: 48},
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
    Other: 10000,
  });
  const [population, setPopulation] = useState(0);

  const selectSummary = (e) => {
    setDisplay(e.target.value);
  };

  const selectDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const displayDemo = () => {
    let list = [];
    for (const [race, vap] of Object.entries(demographics)) {
      list.push(<DemographicItem key={district+race} race={race} vap={vap} />);
    }
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
    
    const fetchEnsembleSummary = async () => {
      const data = await getEnsembleSummary(state, ensemble);
      console.log(data);
    }
    if (display == 'ensemble') fetchEnsembleSummary();
    const fetchDistrictPlan = async () => {
      const data = await getDistrictPlan(state, ensemble, districtPlan);
      setDemographics(data.demographics.totals);
    }
    const fetchDemographics = async ()=>{
      const data = await getDemographic(state)
      setracialData(data)
      console.log(data)
    }
    fetchDemographics();
    if (display == 'district') fetchDistrictPlan();
    if (racialData == null) {
      fetchDemographics();
    }

  }, [demographics, ensemble, districtPlan, state, display]);

  return (
    <div className={tab == 'summary' ? 'mt-6 p-4' : 'hidden'}>
      <div className='setting-dropdown mb-8'>
        <span>View Summary</span>
        <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectSummary}>
          <option value="ensemble">Ensemble Summary</option>
          <option value="dplan">District Plan Summary</option>
          <option value="district">District Summary</option>
        </select>
      </div>
      <div className={display == 'ensemble' ? 'ensemble-summary' : 'hidden'}>
        <h2 className='text-xl font-bold'>Ensemble Summary</h2>
        <ul className='flex mb-16 pt-4'>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Number of District Plans</span>
            <span className='text-3xl'>{ensembleSummary.numDistrictPlans.toLocaleString()}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Avg. Number of Minority Representatives/Plan</span>
            <span className='text-3xl'>{ensembleSummary.avgMinorityReps.toLocaleString()}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Avg. Equal Population Measure</span>
            <span className='text-3xl'>{ensembleSummary.avgEqualPopulationMeasure.toLocaleString()}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Avg. Democratic:Republican Split</span>
            <span className='text-3xl'><span className='democrats'>{ensembleSummary.avgPartySplit.democratic * 100}</span>:<span className='republican'>{ensembleSummary.avgPartySplit.republican * 100}</span></span>
          </li>
        </ul>
      </div>
      <div className={display == 'dplan' ? 'district-plan-summary' : 'hidden'}>
        <h2 className='text-xl font-bold'>District Plan Summary</h2>
        <ul className='flex mb-16 pt-4'>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Number of Districts</span>
            <span className='text-3xl'>{dplanSummary.numDistricts}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Number of Opportunity Districts</span>
            <span className='text-3xl'>{dplanSummary.opportunityDistricts}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Threshold for Opportunity District</span>
            <span className='text-3xl'>{dplanSummary.threshold.toLocaleString()}</span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Number of safe Districts</span>
            <span className='text-3xl'>{dplanSummary.safeDistricts}</span>
          </li>
        </ul>
        <ul className='flex mb-16'>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Democratic:Republican Split</span>
            <span className='text-3xl'><span className='democrats'>{dplanSummary.partySplit.democratic * 100}</span>:<span className='republican'>{dplanSummary.partySplit.republican * 100}</span></span>
          </li>
          <li className='flex flex-col mr-8'>
            <span className='text-base'>Source of Election Preference</span>
            <span className='text-3xl'>{dplanSummary.electionPreference}</span>
          </li>
        </ul>
      </div>
      <div className={display == 'district' ? 'district-summary' : 'hidden'}>
        <h2 className='text-xl font-bold'>District Summary</h2>
        <div className="flex pt-4">
          <div className='w-60 h-20 flex flex-col'>
            <span>District</span>
            <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
              <option value="district1">District 1</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="flex-col mx-16">
            <h2 className="text-md">Total Population</h2>
            <span className="text-3xl">{population.toLocaleString()}</span>
          </div>
          <div className='rounded-lg border-2 border-black shadow-md'>
            <table className='border-collapse'>
              <thead>
                <tr>
                  <th className='py-2 px-4'>Race</th>
                  <th className='py-2 px-4'>VAP</th>
                </tr>
              </thead>
              <tbody>
                {displayDemo()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary