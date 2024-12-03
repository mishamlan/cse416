import React from 'react'

const DemographicItem = ({race, vap}) => {
  return (
    <tr className='border-y border-black'>
      <td className='py-2 px-4'>{race}</td>
      <td className='py-2 px-4'>{vap.toLocaleString()}</td>
    </tr>
  )
}

export default DemographicItem