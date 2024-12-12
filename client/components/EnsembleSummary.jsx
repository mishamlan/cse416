import React from 'react'

const EnsembleSummary = ({type, numDistrictPlans, avgMinorityReps, avgEqualPopulationMeasure, avgPartySplit}) => {
  return (
    <div className='mb-8'>
      <h2 className='text-base font-bold'>{type} Summary</h2>
        <ul className='flex mb-8 pt-4'>
          <li className='flex flex-col basis-1/2'>
            <span className='text-xs'>Number of District Plans</span>
            <span className='text-base'>{numDistrictPlans.toLocaleString()}</span>
          </li>
          <li className='flex flex-col basis-1/2'>
            <span className='text-xs'>Avg. Number of Minority Representatives/Plan</span>
            <span className='text-base'>{avgMinorityReps.toLocaleString()}</span>
          </li>
        </ul>
        <ul className='flex pt-4'>
        <li className='flex flex-col basis-1/2'>
            <span className='text-xs'>Avg. Equal Population Measure</span>
            <span className='text-base'>{avgEqualPopulationMeasure.toLocaleString()}</span>
          </li>
          <li className='flex flex-col basis-1/2'>
            <span className='text-xs'>Avg. Democratic:Republican Split</span>
            <span className='text-base'><span className='democrats'>{avgPartySplit.democratic * 100}</span>:<span className='republican'>{avgPartySplit.republican * 100}</span></span>
          </li>
        </ul>
    </div>
  )
}

export default EnsembleSummary