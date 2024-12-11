import {  useState, useEffect } from 'react';

const Compare = ({tab, state}) => {

  const [data, setData] = useState({
    enacted: {
      partySplit: {
        democratic: 0,
        republican: 0,
      },
      opportunityDistricts: 1,
      demoVoteShare: 2,
      repuVoteShare: 3,
      demoSeatShare: 4,
      repuSeatShare: 5,
    },
    avgMmd: {
      partySplit: {
        democratic: 0,
        republican: 0,
      },
      opportunityDistricts: 0,
      demoVoteShare: 0,
      repuVoteShare: 0,
      demoSeatShare: 0,
      repuSeatShare: 0,
    }
  });

  useEffect(() => {
    // fetch data
  }, [state])

  return (
    <div className={tab == 'compare' ? 'p-4' : 'hidden'} >
      <div className="panel">
        <table className='w-full'>
          <thead className='mb-2'>
            <tr className='w-full'>
              <th className='text-left'>Metric</th>
              <th className='text-right'>Enacted Plan</th>
              <th className='text-right'>Avg. MMD Plan</th>
            </tr>
          </thead>
          <tbody>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Party Split</td>
            <td className='py-1 px-2 text-right'><span className='democrats'>{data.enacted.partySplit.democratic}</span>:<span className='republican'>{data.enacted.partySplit.republican}</span></td>
            <td className='py-1 px-2 text-right'><span className='democrats'>{data.avgMmd.partySplit.democratic}</span>:<span className='republican'>{data.avgMmd.partySplit.republican}</span></td>
          </tr>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Opportunity Districts</td>
            <td className='py-1 px-2 text-right'>{data.enacted.opportunityDistricts}</td>
            <td className='py-1 px-2 text-right'>{data.avgMmd.opportunityDistricts}</td>
          </tr>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Democratic Vote Share</td>
            <td className='py-1 px-2 text-right'>{data.enacted.demoVoteShare}</td>
            <td className='py-1 px-2 text-right'>{data.avgMmd.demoVoteShare}</td>
          </tr>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Republican Vote Share</td>
            <td className='py-1 px-2 text-right'>{data.enacted.repuVoteShare}</td>
            <td className='py-1 px-2 text-right'>{data.avgMmd.repuVoteShare}</td>
          </tr>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Democratic Seat Share</td>
            <td className='py-1 px-2 text-right'>{data.enacted.demoSeatShare}</td>
            <td className='py-1 px-2 text-right'>{data.avgMmd.demoSeatShare}</td>
          </tr>
          <tr className='compare-row'>
            <td className='py-1 px-2 text-left'>Republican Seat Share</td>
            <td className='py-1 px-2 text-right'>{data.enacted.repuSeatShare}</td>
            <td className='py-1 px-2 text-right'>{data.avgMmd.repuSeatShare}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Compare