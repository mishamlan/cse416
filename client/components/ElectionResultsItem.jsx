import React from 'react'

const ElectionResultsItem = ({rank, name, party, votes, percent, isWinner}) => {
  return (
    <tr>
      <td className='px-8 text-center'>{rank}</td>
      <td className='px-8 text-center'>{name}</td>
      <td className={party == 'Democratic' ? 'px-8 text-center democrats' : 'px-8 text-center republican'}>{party}</td>
      <td className='px-8 text-right'>{votes.toLocaleString()}</td>
      <td className='px-8 text-center'>{percent * 100}%</td>
      {
        isWinner ?
        <td className='px-8 text-center'><img className='pl-4' src="True.svg" alt="yes" /></td> : 
        <td className='px-8 text-center'><img className='pl-4' src="False.svg" alt="no" /></td>
      }
    </tr>
  )
}

export default ElectionResultsItem