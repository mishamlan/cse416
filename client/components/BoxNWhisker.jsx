import { useEffect, useState } from 'react'
import BWChart from './BWChart';
import { getBoxWhiskerData } from '@/app/api/utils'

const BoxNWhisker = ({tab, state}) => {

  const [ensemble, setEnsemble] = useState('smd');
  const [basis, setBasis] = useState('white-population');

  const [data, setData] = useState([
    { y: [10, 15, 20], name: 'District 1', type: 'box' },
    { y: [30, 35, 40], name: 'District 2', type: 'box' },
    { y: [45, 50, 55], name: 'District 3', type: 'box' },
    { y: [65, 70, 75], name: 'District 4', type: 'box' },
  ]);

  const selectBasis = (e) => {
    setBasis(e.target.value);
  }

  const changeDisplay = (e) => {
    setEnsemble(e.target.value);
  };

  useEffect(() => {
    /*
      fetch box & whisker data
    */
    const getData = async (state, ensemble, basis) => {
      const data = await getBoxWhiskerData("asian", "mmd", 1, 1);
      console.log(data)
      setData(data);
    };
    getData(state, ensemble, basis);
  },[state, ensemble, basis]);

  return (
    <div className={tab == 'box&whisker' ? 'px-4 py-2' : 'hidden'} >
      <div className="panel">
        <ul className="display-tabs mb-2">
          <li className="w-full focus-within:z-10">
            <button className={ensemble == 'smd' ? "ensemble-display-selected rounded-s-lg border-r" : 'ensemble-display rounded-s-lg border-r'} value={'smd'} onClick={changeDisplay}>SMD</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={ensemble == 'mmd' ? "ensemble-display-selected border-r" : "ensemble-display border-r"} value={'mmd'} onClick={changeDisplay}>MMD</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={ensemble == 'compare' ? "ensemble-display-selected rounded-e-lg" : "ensemble-display rounded-e-lg"} value={'compare'} onClick={changeDisplay}>Compare</button>
          </li>
        </ul>
        <div className='panel-title mb-2'></div>
        <BWChart data={data} selectBasis={selectBasis} />
      </div>
    </div>
  )
}

export default BoxNWhisker