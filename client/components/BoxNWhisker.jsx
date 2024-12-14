import { useEffect, useState } from 'react'
import BWChart from './BWChart';
import { getBoxWhiskerData } from '@/app/api/utils'

const BoxNWhisker = ({tab, state, ensemble}) => {

  const [smdBasis, setSmdBasis] = useState('white-population');
  const [mmdBasis, setMmdBasis] = useState('white-population');
  // prototype --> dummy initial data
  const [smdData, setSmdData] = useState([
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
  ]);
  const [mmdData, setMmdData] = useState([
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
  ]);

  const selectSMDBasis = (e) => {
    setSmdBasis(e.target.value);
  }

  const selectMMDBasis = (e) => {
    setMmdBasis(e.target.value);
  }

  useEffect(() => {
    /*
      fetch box & whisker data
    */
    const getData = async (state, ensemble, basis) => {
      const data = await getBoxWhiskerData(state, ensemble, basis);
      // setData(data);
    };
    getData(state, ensemble, smdBasis);
    getData(state, ensemble, mmdBasis);
  },[state, ensemble, smdBasis, mmdBasis]);

  return (
    <div className={tab == 'box&whisker' ? 'px-4 py-2 flex' : 'hidden'} >
      <BWChart data={smdData} selectBasis={selectSMDBasis} />
      <BWChart data={mmdData} selectBasis={selectMMDBasis} />
    </div>
  )
}

export default BoxNWhisker