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

  const [oppoRepData, setOppoRepData] = useState({
    ranges: ["0", "1", "2", "3", "4"],
    smdCounts: [10, 20, 50, 15, 5],
    mmdCounts: [5, 25, 60, 20, 10],
  });

  const [partySplitData, setPartySplitData] = useState({
    ranges: ["0-10%", "11-20%", "21-30%", "31-40%", "41-50%"],
    democraticSplits: [10, 20, 30, 25, 15],
    republicanSplits: [5, 15, 25, 35, 20],
  });

  const changeDisplay = (e) => {
    setDisplay(e.target.value);
  };

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
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Number of District Plans</th>
                    <td className="px-6 py-2">{smdSummary.numDistrictPlans}</td>
                    <td className="px-6 py-2">{mmdSummary.numDistrictPlans}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Number of Minority Representatives/Plan</th>
                    <td className="px-6 py-2">{smdSummary.minority_representation}</td>
                    <td className="px-6 py-2">{mmdSummary.minority_representation}</td>
                  </tr>
                  <tr className="odd:bg-white even:bg-gray-50">
                    <th scope="row" className="px-6 py-2 font-medium text-xs text-gray-900 whitespace-nowrap">Avg. Equal Population Measure</th>
                    <td className="px-6 py-2">{smdSummary.avgEqualPopulationMeasure}</td>
                    <td className="px-6 py-2">{mmdSummary.avgEqualPopulationMeasure}</td>
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
                x: oppoRepData.ranges,
                y: oppoRepData.smdCounts,
                type: "bar",
                name: "SMD",
                marker: { color: "blue" },
              },
              {
                x: oppoRepData.ranges,
                y: oppoRepData.mmdCounts,
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
                x: partySplitData.ranges,
                y: partySplitData.republicanSplits,
                type: "bar",
                name: "Republican Splits",
                marker: { color: "red" },
              },
              {
                x: partySplitData.ranges,
                y: partySplitData.democraticSplits,
                type: "bar",
                name: "Democratic Splits",
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