'use client'

import { useState, useEffect } from 'react'
import DemographicItem from './DemographicItem';
import EnsembleSummary from './EnsembleSummary';
import InfoCard from './InfoCard';
import {  getDistrictPlan, getEnsembleSummary, getDemographic, getDBoundary } from '@/app/api/utils';

const Summary = ({state, tab, ensemble, districtPlan, setNumDistricts}) => {

  const [district, setDistrict] = useState('dist-1');

  const [ensembleSummary, setEnsembleSummary] = useState(
    {
      smd: {
        numDistrictPlans: 0,
        avgMinorityReps: 0,
        avgEqualPopulationMeasure: 0,
        avgPartySplit: {democratic: 0, republican: 0},
      },
      mmd: {
        numDistrictPlans: 0,
        avgMinorityReps: 0,
        avgEqualPopulationMeasure: 0,
        avgPartySplit: {democratic: 0, republican: 0},
      }
    }
  );

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
    Other: 10000,
  });
  const [population, setPopulation] = useState(0);

  const selectSummary = (e) => {
    setDisplay(e.target.value);
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

  useEffect(() => {
    const calcTotalPopulation = () => {
      let count = 0;
      for (const [race, vap] of Object.entries(demographics)) {
        count += vap;
      }
      setPopulation(count);
    }
    calcTotalPopulation();

    const fetchEnsembleSummary = async (state, ensemble) => {
      /*
      Expected:
      {
        smd: {
          numDistrictPlans: 5000,
          avgMinorityReps: 2.5,
          avgEqualPopulationMeasure: 0.98,
          avgPartySplit: {democratic: 0.47, republican: 0.53},
        },
        mmd: {
          numDistrictPlans: 5000,
          avgMinorityReps: 2.5,
          avgEqualPopulationMeasure: 0.98,
          avgPartySplit: {democratic: 0.47, republican: 0.53},
        }
      }
      */
      console.log(state)
      console.log(ensemble)
      const data = await getEnsembleSummary(state, ensemble);

    }
    if (!ensembleSummary) fetchEnsembleSummary(state, ensemble);

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
      // const data = await getDistrictPlan(state, ensemble, districtPlan);
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
    <div className={tab == 'summary' ? 'p-4 flex justify-between' : 'hidden'}>
      <div className='ensemble-summary panel'>
        <EnsembleSummary type={'SMD'} 
          numDistrictPlans={ensembleSummary.smd.numDistrictPlans} 
          avgMinorityReps={ensembleSummary.smd.avgMinorityReps} 
          avgEqualPopulationMeasure={ensembleSummary.smd.avgEqualPopulationMeasure} 
          avgPartySplit={ensembleSummary.smd.avgPartySplit} />
        <EnsembleSummary type={'MMD'} 
          numDistrictPlans={ensembleSummary.mmd.numDistrictPlans} 
          avgMinorityReps={ensembleSummary.mmd.avgMinorityReps} 
          avgEqualPopulationMeasure={ensembleSummary.mmd.avgEqualPopulationMeasure} 
          avgPartySplit={ensembleSummary.mmd.avgPartySplit} />
      </div>
      <div className='district-plan-summary panel basis-1/2'>
        <h2 className='mb-4 font-bold'>District Plan Summary</h2>
        <ul className='flex mb-6'>
          <InfoCard title='Number of Districts' data={dplanSummary.numDistricts} />
          <InfoCard title='Number of Opportunity Districts' data={dplanSummary.opportunityDistricts} />
        </ul>
        <ul className='flex mb-6'>
          <InfoCard title='Threshold for Opportunity District' data={dplanSummary.threshold.toLocaleString()} />
          <InfoCard title='Number of safe Districts' data={dplanSummary.safeDistricts} />
        </ul>
        <ul className='flex mb-6'>
          <li className='flex flex-col mr-8 basis-1/2'>
            <span className='text-xs'>Democratic:Republican Split</span>
            <span className='text-base'><span className='democrats'>{dplanSummary.partySplit.democratic * 100}</span>:<span className='republican'>{dplanSummary.partySplit.republican * 100}</span></span>
          </li>
          <InfoCard title='Source of Election Preference' data={dplanSummary.electionPreference} />
        </ul>
        <div className="district-summary flex pt-4">
          <div className='setting-dropdown flex flex-col basis-1/2'>
            <span>District</span>
            <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
              {listDistrict()}
            </select>
          </div>
          <div className="flex-col ml-8">
            <h2 className="text-xs">Total Population</h2>
            <span className="text-base">{population.toLocaleString()}</span>
            <div className='rounded-md border-2 border-black shadow-md text-sm'>
              <table className='border-collapse'>
                <thead>
                  <tr>
                    <th className='py-1 px-2 text-left'>Race</th>
                    <th className='py-1 px-2 text-right'>VAP</th>
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
    </div>
  )
}

export default Summary