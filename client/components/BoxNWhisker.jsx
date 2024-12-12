import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getBoxWhiskerData } from '@/app/api/utils'

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const BoxNWhisker = ({tab, state, ensemble}) => {

  const [basis, setBasis] = useState('white-population');
  // prototype --> dummy initial data
  const [data, setData] = useState([
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
  ]);

  const selectBasis = (e) => {
    setBasis(e.target.value);
  }

  useEffect(() => {
    /*
      fetch box & whisker data
    */
    const getData = async (state, ensemble, basis) => {
      const data = await getBoxWhiskerData(state, ensemble, basis);
      // setData(data);
    };
    getData(state, ensemble, basis);
  },[state, ensemble, basis]);

  return (
    <div className={tab == 'box&whisker' ? 'px-4 py-2 ' : 'hidden'} >
      <div className='setting-dropdown'>
        <span>Basis</span>
        <select name="basis" id="basis" className='dropdown-menu w-full h-full' onChange={selectBasis}>
          <option value="white-population">White Population</option>
          <option value="black-population">Black Population</option>
          <option value="asian-population">Asian Population</option>
          <option value="hispanic-population">Hispanic Population</option>
          <option value="democratic-population">Democratic Population</option>
          <option value="republican-population">Republican Population</option>
        </select>
      </div>
      <Plot
        data={data}
        layout={{  
          yaxis: { 
            title: 'Percentage (%)', 
            range: [0, 100],
            dtick: 10        
          }, 
          showlegend: true
        }}
      />
    </div>
  )
}

export default BoxNWhisker