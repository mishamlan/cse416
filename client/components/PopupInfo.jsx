import React from 'react'

const PopupInfo = (districtNumber, winner) => {
  return (
    <div>
      <span>District Number: {districtNumber}</span>
      <span>Winner: {winner}</span>
    </div>
  )
}

export default PopupInfo