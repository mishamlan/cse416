'use client'

import { useState, useEffect } from 'react'
import ElectionResultsItem from './ElectionResultsItem';

const ViewElection = ({tab}) => {
  const numberOfRepresentatives = 1;
  const winner = 'Democratic';

  const [district, setDistrict] = useState('dist-1');
  const [election, setElection] = useState('2020-enact');
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

  const selectDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const selectElection = (e) => {
    setElection(e.target.value);
  };

  const displayResults = () => {
    let list = [];
    results.forEach(candidate => {
      const {rank, name, party, votes, percent, isWinner} = candidate;
      list.push(<ElectionResultsItem key={district+election+rank} rank={rank} name={name} party={party} votes={votes} percent={percent} isWinner={isWinner} />);
    });
    return list;
  };

  useEffect(() => {
    // fetch election results
  }, []);

  return (
    <div className={tab == 'view-election' ? 'p-4' : 'hidden'}>
      <div className='flex'>
        <div className='w-60 h-20 flex flex-col my-8 mr-8'>
          <span>District</span>
          <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
            <option value="district1">District 1</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className='w-60 h-20 flex flex-col my-8'>
          <span>Election</span>
          <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectElection}>
            <option value="2020-house">2020 house of Rep.</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      <ul className='flex mb-16'>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Number of Representative(s)</span>
          <span className='text-3xl'>{numberOfRepresentatives}</span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-base'>Winning Party</span>
          <span className={winner == 'Democratic' ? 'text-3xl democrats' : 'text-3xl republican'}>{winner}</span>
        </li>
      </ul>
      <div className="flex-col">
        <h2 className='mb-1'>Results</h2>
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

export default ViewElection