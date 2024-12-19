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

  const [smdPartySplitData, setSmdPartySplitData] = useState({
    dem: {
      "0-20%": 10,
      "21-40%": 20,
      "41-60%": 50,
      "61-80%": 15,
      "81-100%": 5,
    },
    rep: {
      "0-20%": 5,
      "21-40%": 25,
      "41-60%": 60,
      "61-80%": 20,
      "81-100%": 10,
    }
  });

  const [mmdPartySplitData, setMmdPartySplitData] = useState({
    dem: {
      "0-20%": 3,
      "21-40%": 0,
      "41-60%": 0,
      "61-80%": 0,
      "81-100%": 0,
    },
    rep: {
      "0-20%": 0,
      "21-40%": 0,
      "41-60%": 0,
      "61-80%": 0,
      "81-100%": 3,
    }
  });

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
    let ranges = Object.keys(smdPartySplitData.dem);
    let democraticSplits = [];
    let republicanSplits = [];
    for (let i in ranges) {
      democraticSplits.push(smdPartySplitData.dem[ranges[i]]);
      republicanSplits.push(smdPartySplitData.rep[ranges[i]]);
    }
    return {ranges, democraticSplits, republicanSplits};
  })();

  const mmdPartySplitTrace = (() => {
    let ranges = Object.keys(mmdPartySplitData.dem);
    let democraticSplits = [];
    let republicanSplits = [];
    for (let i in ranges) {
      democraticSplits.push(mmdPartySplitData.dem[ranges[i]]);
      republicanSplits.push(mmdPartySplitData.rep[ranges[i]]);
    }
    return {ranges, democraticSplits, republicanSplits};
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
                    <td className="px-6 py-2">{smdSummary.numDistrictPlans}</td>
                    <td className="px-6 py-2">{mmdSummary.numDistrictPlans}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Number of Minority Reps. per Plan</th>
                    <td className="px-6 py-2">{smdSummary.avgMinorityReps}</td>
                    <td className="px-6 py-2">{mmdSummary.avgMinorityReps}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Equal Population Measure</th>
                    <td className="px-6 py-2">{smdSummary.avgEpm}</td>
                    <td className="px-6 py-2">{mmdSummary.avgEpm}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. DEM/REP Split</th>
                    <td className="px-6 py-2"><span className="democrats">{smdSummary.avgDemSplit}</span>:<span className="republican">{smdSummary.avgRepSplit}</span></td>
                    <td className="px-6 py-2"><span className="democrats">{mmdSummary.avgDemSplit}</span>:<span className="republican">{mmdSummary.avgRepSplit}</span></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
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
          <div>
            <Plot
              data={[
                {
                  x: smdPartySplitTrace.ranges,
                  y: smdPartySplitTrace.republicanSplits,
                  type: "bar",
                  name: "REP Splits",
                  marker: { color: "red" },
                },
                {
                  x: smdPartySplitTrace.ranges,
                  y: smdPartySplitTrace.democraticSplits,
                  type: "bar",
                  name: "DEM Splits",
                  marker: { color: "blue" },
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
                    text: "Range of Splits (%)",
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
          <div>
            <Plot
              data={[
                {
                  x: mmdPartySplitTrace.ranges,
                  y: mmdPartySplitTrace.republicanSplits,
                  type: "bar",
                  name: "REP Splits",
                  marker: { color: "red" },
                },
                {
                  x: mmdPartySplitTrace.ranges,
                  y: mmdPartySplitTrace.democraticSplits,
                  type: "bar",
                  name: "DEM Splits",
                  marker: { color: "blue" },
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
                    text: "Range of Splits (%)",
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
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Opportunity Districts</th>
                  <td className="px-6 py-2">{data.enacted.opportunityDistricts}</td>
                  <td className="px-6 py-2">{data.avgMmd.opportunityDistricts}</td>
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
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">DEM Vote Share</th>
                  <td className="px-6 py-2">{data.enacted.demoVoteShare * 100}%</td>
                  <td className="px-6 py-2">{data.avgMmd.demoVoteShare * 100}%</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">REP Vote Share</th>
                  <td className="px-6 py-2">{data.enacted.repuVoteShare * 100}%</td>
                  <td className="px-6 py-2">{data.avgMmd.repuVoteShare * 100}%</td>
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