import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { getEnsembleSummary } from "@/app/api/utils";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });

const Dashboard = ({tab, state}) => {
  
  const [display, setDisplay] = useState('summary');

  const [smdSummary, setSmdSummary] = useState({
    numDistrictPlans: 0,
    avgMinorityReps: 0,
    avgEqualPopulationMeasure: 0,
    avgPartySplit: {democratic: 0, republican: 0},
  });

  const [mmdSummary, setMmdSummary] = useState({
    numDistrictPlans: 0,
    avgMinorityReps: 0,
    avgEqualPopulationMeasure: 0,
    avgPartySplit: {democratic: 0, republican: 0},
  });

  const [data, setData] = useState({
    enacted: {
      partySplit: {
        democratic: 0,
        republican: 0,
      },
      opportunityDistricts: 1,
      demoVoteShare: 2,
      repuVoteShare: 3,
      demoSeatShare: 4,
      repuSeatShare: 5,
    },
    avgMmd: {
      partySplit: {
        democratic: 0,
        republican: 0,
      },
      opportunityDistricts: 0,
      demoVoteShare: 0,
      repuVoteShare: 0,
      demoSeatShare: 0,
      repuSeatShare: 0,
    }
  });

  const [oppoRepsData, setOppoRepsData] = useState({
    smd: {
      0: 10,
      1: 20,
      2: 50,
      3: 15,
      4: 5,
    },
    mmd: {
      0: 5,
      1: 25,
      2: 60,
      3: 20,
      4: 10,
    }
  });

  const [partySplitData, setPartySplitData] = useState({
    smd: {
      "0-20%": 10,
      "21-40%": 20,
      "41-60%": 50,
      "61-80%": 15,
      "81-100%": 5,
    },
    mmd: {
      "0-20%": 5,
      "21-40%": 25,
      "41-60%": 60,
      "61-80%": 20,
      "81-100%": 10,
    }
  });

  const changeDisplay = (e) => {
    setDisplay(e.target.value);
  };

  const oppoResTrace = (() => {
    let ranges = [];
    let smdCounts = [];
    let mmdCounts = [];
    for (let i = 0; i < Object.keys(oppoRepsData.smd).length; i++) {
      ranges.push(i);
      smdCounts.push(oppoRepsData.smd[i]);
      mmdCounts.push(oppoRepsData.mmd[i]);
    }
    return {ranges, smdCounts, mmdCounts};
  })();

  const partySplitTrace = (() => {
    let ranges = Object.keys(partySplitData.smd);
    let democraticSplits = [];
    let republicanSplits = [];
    for (let i in ranges) {
      democraticSplits.push(partySplitData.smd[ranges[i]]);
      republicanSplits.push(partySplitData.mmd[ranges[i]]);
    }
    return {ranges, democraticSplits, republicanSplits};
  })();

  useEffect(() => {
    // const fetchEnsembleSummary = async (state) => {
    //   const smd = await getEnsembleSummary(state, 'smd', 0);
    //   const mmd = await getEnsembleSummary(state, 'mmd', 0);
    //   console.log(smd)
    //   setSmdSummary(smd);
    //   setMmdSummary(mmd);
    // };

    // fetchEnsembleSummary(state);
  }, [state]);

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
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Number of Districts</th>
                    <td className="px-6 py-2">{smdSummary.number_of_districts}</td>
                    <td className="px-6 py-2">{mmdSummary.number_of_districts}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Number of Minority Reps. per Plan</th>
                    <td className="px-6 py-2">{smdSummary.minority_representation}</td>
                    <td className="px-6 py-2">{mmdSummary.minority_representation}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Opportunity threshold</th>
                    <td className="px-6 py-2">{smdSummary.opportunity_threshold}</td>
                    <td className="px-6 py-2">{mmdSummary.opportunity_threshold}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. DEM/REP Split</th>
                    <td className="px-6 py-2"><span className="democratic">{smdSummary.D_seat_share}</span>:<span className="republican">{smdSummary.R_seat_share}</span></td>
                    <td className="px-6 py-2"><span className="democratic">{mmdSummary.D_seat_share}</span>:<span className="republican">{mmdSummary.R_seat_share}</span></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
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
              height: 280,
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
        </div>
        <div className={display == 'partySplit' ? "mt-2" : 'hidden'}>
          <Plot
            data={[
              {
                x: partySplitTrace.ranges,
                y: partySplitTrace.republicanSplits,
                type: "bar",
                name: "REP Splits",
                marker: { color: "red" },
              },
              {
                x: partySplitTrace.ranges,
                y: partySplitTrace.democraticSplits,
                type: "bar",
                name: "DEM Splits",
                marker: { color: "blue" },
              },
            ]}
            layout={{
              height: 280,
              barmode: "group",
              title: {
                text: "Distribution of Republican/Democratic Splits",
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
                  <td className="px-6 py-2"><span className='democrats'>{data.enacted.partySplit.democratic}</span>:<span className='republican'>{data.enacted.partySplit.republican}</span></td>
                  <td className="px-6 py-2"><span className='democrats'>{data.avgMmd.partySplit.democratic}</span>:<span className='republican'>{data.avgMmd.partySplit.republican}</span></td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Opportunity Districts</th>
                  <td className="px-6 py-2">{data.enacted.opportunityDistricts}</td>
                  <td className="px-6 py-2">{data.avgMmd.opportunityDistricts}</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">DEM Vote Share</th>
                  <td className="px-6 py-2">{data.enacted.demoVoteShare}</td>
                  <td className="px-6 py-2">{data.avgMmd.demoVoteShare}</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">REP Vote Share</th>
                  <td className="px-6 py-2">{data.enacted.repuVoteShare}</td>
                  <td className="px-6 py-2">{data.avgMmd.repuVoteShare}</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">DEM Seat Share</th>
                  <td className="px-6 py-2">{data.enacted.demoSeatShare}</td>
                  <td className="px-6 py-2">{data.avgMmd.demoSeatShare}</td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-50">
                  <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">REP Seat Share</th>
                  <td className="px-6 py-2">{data.enacted.repuSeatShare}</td>
                  <td className="px-6 py-2">{data.avgMmd.repuSeatShare}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard