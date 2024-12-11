import React from 'react'

const DemographicItem = ({race, vap}) => {
  return (
    <tr className='border-y border-black'>
      <td className='py-1 px-2 text-left'>{race}</td>
      <td className='py-1 px-2 text-right'>{vap.toLocaleString()}</td>
    </tr>
  )
}

export default DemographicItem