import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const precinctJSON = '/geoJSON/la/la_prec_geo_elec.geojson';

  const smdPlans = {
    0: '/geoJSON/la/smd/smd_plan_summary_0.geojson',
    1: '/geoJSON/la/smd/smd_plan_summary_10.geojson',
    2: '/geoJSON/la/smd/smd_plan_summary_100.geojson',
    3: '/geoJSON/la/smd/smd_plan_summary_110.geojson',
  };

  const mmdPlans = {
    1: '/geoJSON/la/mmd/mmd_plan_summary_1.geojson',
    2: '/geoJSON/la/mmd/mmd_plan_summary_263.geojson',
    3: '/geoJSON/la/mmd/mmd_plan_summary_11.geojson',
  }

  const smdPlanNames = {
    0: 'Enacted',
    1: 'Most Extreme Vote Share',
    2: 'Smallest Num. of Opportunity Districts',
    3: 'Highest Num. of REP Safe Districts',
  }

  const mmdPlanNames = {
    1: 'Average MMD',
    2: 'Lowest Equal Population Measure',
    3: 'Largest Num. of Opportunity Districts',
  }

  return (
    <StatePage 
      state={stateName} 
      center={center}
      bound={bound}
      precinctData={precinctJSON}
      smdPlans={smdPlans}
      mmdPlans={mmdPlans}
      smdPlanNames={smdPlanNames}
      mmdPlanNames={mmdPlanNames}
    />
  )
}

export default LA