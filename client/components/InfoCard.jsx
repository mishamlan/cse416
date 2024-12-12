import React from 'react'

const InfoCard = ({title, data}) => {
  return (
    <li className='flex flex-col mr-8 basis-1/2'>
      <span className='text-xs'>{title}</span>
      <span className='text-base'>{data}</span>
    </li>
  )
}

export default InfoCard