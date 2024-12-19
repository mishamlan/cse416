import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { getEnsembleSummary } from "@/app/api/utils";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });

const Dashboard = ({tab, state}) => {
  
  const [display, setDisplay] = useState('summary');

  const [smdSummary, setSmdSummary] = useState({});

  const [mmdSummary, setMmdSummary] = useState({});

  const [data, setData] = useState({});

  const [oppoRepsData, setOppoRepsData] = useState({smd:{}, mmd:{}});

  const [smdPartySplitData, setSmdPartySplitData] = useState({});

  const [mmdPartySplitData, setMmdPartySplitData] = useState({});

  const changeDisplay = (e) => {
    setDisplay(e.target.value);
  };

  const oppoResTrace = (() => {
    let ranges = [];
    let smdCounts = [];
    let mmdCounts = [];
    let fields = Object.keys(oppoRepsData.smd);
    for (let i = 0; i < fields.length; i++) {
      ranges.push(fields[i]);
      smdCounts.push(oppoRepsData.smd[i]);
      mmdCounts.push(oppoRepsData.mmd[i]);
    }
    return {ranges, smdCounts, mmdCounts};
  })();

  const smdPartySplitTrace = (() => {
    let ranges = Object.keys(smdPartySplitData);
    let partySplits = [];
    for (let i in ranges) {
      partySplits.push(smdPartySplitData[ranges[i]]);
    }
    return {ranges, partySplits};
  })();

  const mmdPartySplitTrace = (() => {
    let ranges = Object.keys(mmdPartySplitData);
    let partySplits = [];
    for (let i in ranges) {
      partySplits.push(mmdPartySplitData[ranges[i]]);
    }
    return {ranges, partySplits};
  })();

  useEffect(() => {
    const getCompareData = () => {
      fetch(`/ensemble/${state}/compare.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setData(data)});
    }
    getCompareData();
    
    const getGraphData = () => {
      fetch(`/ensemble/${state}/oppoRepsData.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setOppoRepsData(data)});

      fetch(`/ensemble_summary/${state}/smd/partySplit.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setSmdPartySplitData(data)});

      fetch(`/ensemble_summary/${state}/mmd/partySplit.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setMmdPartySplitData(data); console.log(data)});
    }
    getGraphData();

    const getSummary = () => {
      fetch(`/ensemble_summary/${state}/smd/info.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setSmdSummary(data)});

      fetch(`/ensemble_summary/${state}/mmd/info.json`,{
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {setMmdSummary(data)});
    }
    getSummary();
  }, []);
  

  return (
    <div className={tab == 'dashboard' ? 'p-4' : 'hidden'}>
      <div className='panel mb-4'>
        <h2 className="panel-title">Ensembles</h2>
        <ul className="display-tabs">
          <li className="w-full focus-within:z-10">
            <button className={display == 'summary' ? "ensemble-display-selected rounded-s-lg border-r" : 'ensemble-display rounded-s-lg border-r'} value={'summary'} onClick={changeDisplay}>Summary</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={display == 'oppoRep' ? "ensemble-display-selected border-r" : "ensemble-display border-r"} value={'oppoRep'} onClick={changeDisplay}>Opportunity Representatives</button>
          </li>
          <li className="w-full focus-within:z-10">
            <button className={display == 'partySplit' ? "ensemble-display-selected rounded-e-lg" : "ensemble-display rounded-e-lg"} value={'partySplit'} onClick={changeDisplay}>DEM/REP Splits</button>
          </li>
        </ul>
        {Object.keys(smdSummary).length == 0 ? <span>Loading...</span> :
        <div className={display == 'summary' ? "ensemble-summary" : 'hidden'}>
          <div className="w-full mt-2 shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-2">Summary</th>
                  <th scope="col" className="px-6 py-2">SMD</th>
                  <th scope="col" className="px-6 py-2">MMD</th>
                </tr>
              </thead>
              <tbody>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Number of District Plans</th>
                    <td className="px-6 py-2">{smdSummary.numDistrictPlans.toLocaleString()}</td>
                    <td className="px-6 py-2">{mmdSummary.numDistrictPlans.toLocaleString()}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Number of Minority Reps. per Plan</th>
                    <td className="px-6 py-2">{smdSummary.avgMinorityReps}</td>
                    <td className="px-6 py-2">{mmdSummary.avgMinorityReps}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Equal Population Measure</th>
                    <td className="px-6 py-2">{smdSummary.avgEpm * 100}%</td>
                    <td className="px-6 py-2">{mmdSummary.avgEpm * 100}%</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. DEM/REP Split</th>
                    <td className="px-6 py-2"><span className="democrats">{(smdSummary.avgDemSplit * 100).toFixed(2)}%</span>/<span className="republican">{(smdSummary.avgRepSplit * 100).toFixed(2)}%</span></td>
                    <td className="px-6 py-2"><span className="democrats">{(mmdSummary.avgDemSplit * 100).toFixed(2)}%</span>/<span className="republican">{(mmdSummary.avgRepSplit * 100).toFixed(2)}%</span></td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Layout</th>
                    <td className="px-6 py-2">N/A</td>
                    <td className="px-6 py-2">{state == 'la' ? '3, 3' : '4'}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        }
        {Object.keys(oppoRepsData).length == 0 ? <span>Loading...</span> :
        <div className={display == 'oppoRep' ? "mt-2" : 'hidden'}>
          <Plot
            data={[
              {
                x: oppoResTrace.ranges,
                y: oppoResTrace.smdCounts,
                type: "bar",
                name: "SMD",
                marker: { color: "blue" },
              },
              {
                x: oppoResTrace.ranges,
                y: oppoResTrace.mmdCounts,
                type: "bar",
                name: "MMD",
                marker: { color: "orange" },
              },
            ]}
            layout={{
              height: 250,
              barmode: "group",
              title: "Distribution of Opportunity Representatives in SMD and MMD Plans",
              xaxis: {
                title: "Range of Opportunity Representatives",
              },
              yaxis: {
                title: "Number of District Plans",
              },
            }}
          />
        </div>}
        <div className={display == 'partySplit' ? "mt-2 flex" : 'hidden'}>
          {Object.keys(smdPartySplitData).length == 0 ? <span>Loading...</span> :
          <div>
            <Plot
              data={[
                {
                  x: smdPartySplitTrace.ranges,
                  y: smdPartySplitTrace.partySplits,
                  type: "bar",
                  name: "DEM/REP Splits",
                },
              ]}
              layout={{
                width: 420,
                height: 250,
                barmode: "group",
                title: {
                  text: "SMD",
                },
                xaxis: {
                  title: {
                    text: "DEM/REP Splits",
                  },
                },
                yaxis: {
                  title: {
                    text: "Number of District Plans",
                  },
                },
              }}
            />
          </div>
          }
          {Object.keys(mmdPartySplitData).length == 0 ? <span>Loading...</span> :
          <div>
            <Plot
              data={[
                {
                  x: mmdPartySplitTrace.ranges,
                  y: mmdPartySplitTrace.partySplits,
                  type: "bar",
                  name: "REP Splits",
                },
              ]}
              layout={{
                width: 420,
                height: 250,
                barmode: "group",
                title: {
                  text: "MMD",
                },
                xaxis: {
                  title: {
                    text: "DEM/REP Split",
                  },
                },
                yaxis: {
                  title: {
                    text: "Number of District Plans",
                  },
                },
              }}
            />
          </div>
          }
        </div>
      </div>
      {Object.keys(data).length == 0 ? <span>Loading...</span> :
      <div className="panel">
        <h2 className="panel-title">Enacted Plan VS. Avg. MMD Plan</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-2">Comparing Metric</th>
                <th scope="col" className="px-6 py-2">Enacted</th>
                <th scope="col" className="px-6 py-2">Avg. MMD</th>
              </tr>
            </thead>
            <tbody>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">DEM/REP Split</th>
                  <td className="px-6 py-2"><span className="democrats">{data.enacted.D_Wins}</span>/<span className="republican">{data.enacted.R_Wins}</span></td>
                  <td className="px-6 py-2"><span className="democrats">{data.avgMmd.D_Wins}</span>/<span className="republican">{data.avgMmd.R_Wins}</span></td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Opportunity Threshold</th>
                  <td className="px-6 py-2">{data.enacted.opportunityThreshold * 100}%</td>
                  <td className="px-6 py-2">{data.avgMmd.opportunityThreshold * 100}%</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Minority Representatives</th>
                  <td className="px-6 py-2">{data.enacted.minorityReps}</td>
                  <td className="px-6 py-2">{data.avgMmd.minorityReps}</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">DEM Seat Share</th>
                  <td className="px-6 py-2">{data.enacted.demoSeatShare * 100}%</td>
                  <td className="px-6 py-2">{data.avgMmd.demoSeatShare * 100}%</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">REP Seat Share</th>
                  <td className="px-6 py-2">{data.enacted.repuSeatShare * 100}%</td>
                  <td className="px-6 py-2">{data.avgMmd.repuSeatShare * 100}%</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  )
}

export default Dashboard