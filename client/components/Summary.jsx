'use client'

import { useState, useEffect } from 'react'

const Summary = ({tab}) => {

  const [summaryData, setSummaryData] = useState(
    {
      numberOfDistrict: 4,
      numberOfOpportunityDist: 2,
      threshold: 20000,
      numberOfSafeDist: 2,
      demoRepSplit: [50, 50],
      source: "2020 H.O.R.",
      population: 20000,
    }
  );
  const [district, setDistrict] = useState('dist-1');

  const selectDistrict = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    // fetch summary data

    // fetch district summary

  }, []);

  return (
    <div className={tab == 'summary' ? 'mt-8 p-4' : 'hidden'}>
      <ul className='flex mb-16'>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Number of Districts</span>
          <span className='text-3xl'>{summaryData.numberOfDistrict}</span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Number of Opportunity Districts</span>
          <span className='text-3xl'>{summaryData.numberOfOpportunityDist}</span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Threshold for Opportunity District</span>
          <span className='text-3xl'>{summaryData.threshold}</span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Number of safe Districts</span>
          <span className='text-3xl'>{summaryData.numberOfSafeDist}</span>
        </li>
      </ul>
      <ul className='flex mb-16'>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Democratic:Republican Split</span>
          <span className='text-3xl'><span className='democrats'>{summaryData.demoRepSplit[0]}</span>:<span className='republican'>{summaryData.demoRepSplit[1]}</span></span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Source of Election Preference</span>
          <span className='text-3xl'>{summaryData.source}</span>
        </li>
      </ul>
      <h2 className='text-xl font-bold'>District Summary</h2>
      <div className="flex pt-8">
        <div className='w-60 h-20 flex flex-col'>
          <span>District</span>
          <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
            <option value="district1">District 1</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="flex-col mx-16">
          <h2 className="text-md">Total Population</h2>
          <span className="text-3xl">{summaryData.population}</span>
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
              <tr className='border-y border-black'>
                <td className='py-2 px-4'>White</td>
                <td className='py-2 px-4'>10000</td>
              </tr>
              <tr className='border-y border-black'>
                <td className='py-2 px-4'>Asian</td>
                <td className='py-2 px-4'>10000</td>
              </tr>
              <tr className='border-y border-black'>
                <td className='py-2 px-4'>Hispanic</td>
                <td className='py-2 px-4'>10000</td>
              </tr>
              <tr className='border-y border-black'>
                <td className='py-2 px-4'>Black</td>
                <td className='py-2 px-4'>10000</td>
              </tr>
              <tr className='border-y border-black'>
                <td className='py-2 px-4'>Other</td>
                <td className='py-2 px-4'>10000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Summary