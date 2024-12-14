'use client'

import { useState, useEffect } from 'react'


const ViewElection = ({tab, state, ensemble, districtPlan, numDistricts}) => {
  const numberOfRepresentatives = 1;
  const winner = 'Democratic';

  const [district, setDistrict] = useState('dist-1');
  const [election, setElection] = useState('2020-enact');

  const selectDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const selectElection = (e) => {
    setElection(e.target.value);
  };

  const listDistrict = () => {
    let list = [];
    for (let i = 1; i <= numDistricts; i++) {
      list.push(<option key={ensemble+districtPlan+i} value={`dist-${i}`}>District {i}</option>);
    }
    return list;
  }

  useEffect(() => {
    // fetch election results
  }, []);

  return (
    <div className={tab == 'view-election' ? 'p-4' : 'hidden'}>
      <div className='flex'>
        <div className='setting-dropdown flex flex-col mb-4 mr-8'>
          <span>District</span>
          <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectDistrict}>
            {listDistrict()}
          </select>
        </div>
        <div className='setting-dropdown flex flex-col mb-4'>
          <span>Election</span>
          <select name="district-type" id="district-type" className='dropdown-menu w-full h-full' onChange={selectElection}>
            <option value="2020-house">2020 house of Rep.</option>
            <option value="other">other</option>
          </select>
        </div>
      </div>
      <ul className='results flex mb-4'>
        <li className='flex flex-col mr-8'>
          <span className='text-xs'>Number of Representative(s)</span>
          <span className='text-base'>{numberOfRepresentatives}</span>
        </li>
        <li className='flex flex-col mr-8'>
          <span className='text-xs'>Winning Party</span>
          <span className={winner == 'Democratic' ? 'text-base democrats' : 'text-base republican'}>{winner}</span>
        </li>
      </ul>
    </div>
  )
}

export default ViewElection