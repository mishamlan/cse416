import {  useState, useEffect } from 'react';

const Compare = ({tab, state}) => {

  useEffect(() => {
    // fetch data
  }, [state])

  return (
    <div className={tab == 'compare' ? 'p-4' : 'hidden'} >
      test
    </div>
  )
}

export default Compare