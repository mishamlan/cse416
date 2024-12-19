import React from 'react'

const ElectionResultsItem = ({district, winner, winParty, winVotes, winPercent, loser, loseParty, loseVotes, losePercent}) => {
  return (
    <tr>
      <td className='px-6 py-1 bg-gray-100'>{district}</td>
      <td className='px-6 py-1'>{winner}</td>
      <td className={winParty == 'DEM' ? 'px-6 py-1 democrats' : 'px-6 py-1 republican'}>{winParty}</td>
      <td className='px-6 py-1'>{winVotes.toLocaleString()}</td>
      <td className='px-6 py-1 bg-gray-100'>{loser}</td>
      <td className={loseParty == 'DEM' ? 'px-6 py-1 bg-gray-100 democrats' : 'px-6 py-1 bg-gray-100 republican'}>{loseParty}</td>
      <td className='px-6 py-1 bg-gray-100'>{loseVotes.toLocaleString()}</td>
    </tr>
  )
}

export default ElectionResultsItem