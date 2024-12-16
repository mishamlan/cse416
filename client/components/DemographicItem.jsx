import React from 'react'

const DemographicItem = ({district, total, white, black, asian, hispanic, other}) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-1 bg-gray-100">{district}</td>
      <td className="px-6 py-1">{total.toLocaleString()}</td>
      <td className="px-6 py-1 bg-gray-100">{white.toLocaleString()}</td>
      <td className="px-6 py-1">{black.toLocaleString()}</td>
      <td className="px-6 py-1 bg-gray-100">{asian.toLocaleString()}</td>
      <td className="px-6 py-1">{hispanic.toLocaleString()}</td>
      <td className="px-6 py-1 bg-gray-100">{other.toLocaleString()}</td>
    </tr>
  )
}

export default DemographicItem