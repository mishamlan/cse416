import React from 'react'

const EnsembleSummary = ({type, numDistrictPlans, avgMinorityReps, avgEqualPopulationMeasure, avgPartySplit}) => {
  return (
    <div className='basis-1/2 pt-2'>
      <h2 className='text-sm font-bold bg-slate-50'>{type} Summary</h2>
        <ul className='flex-col pt-2'>
          <li className="text-xs h-6">
            <span className='font-semibold'>Number of District Plans: </span>
            <span>{numDistrictPlans.toLocaleString()}</span>
          </li>
          <li className="text-xs h-6">
            <span className='font-semibold'>Average Number of Minority Representatives/Plan: </span>
            <span>{avgMinorityReps.toLocaleString()}</span>
          </li>
          <li className="text-xs h-6">
            <span className='font-semibold'>Average Equal Population Measure: </span>
            <span>{avgEqualPopulationMeasure.toLocaleString()}</span>
          </li>
          <li className="text-xs h-6">
            <span className='font-semibold'>Average Party Split: </span>
            <span><span className='democrats'>{avgPartySplit.democratic * 100}</span>:<span className='republican'>{avgPartySplit.republican * 100}</span></span>
          </li>
        </ul>
    </div>
  )
}

export default EnsembleSummary