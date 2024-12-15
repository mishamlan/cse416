import React from 'react'

const ElectionResultsItem = ({rank, name, race, party, votes, percent, isWinner}) => {
  return (
    <tr>
      <td className='result-row text-center'>{rank}</td>
      <td className='result-row text-center'>{name}</td>
      <td className='result-row text-center'>{race}</td>
      <td className={party == 'Democratic' ? 'result-row text-center democrats' : 'result-row text-center republican'}>{party}</td>
      <td className='result-row text-center'>{votes.toLocaleString()}</td>
      <td className='result-row text-center'>{percent * 100}%</td>
      {
        isWinner ?
        <td className='result-row text-center'><div className='flex justify-center items-center'><img className='scale-90' src="True.svg" alt="yes" /></div></td> : 
        <td className='result-row text-center'><div className='flex justify-center items-center'><img className='scale-90' src="False.svg" alt="no" /></div></td>
      }
    </tr>
  )
}

export default ElectionResultsItem