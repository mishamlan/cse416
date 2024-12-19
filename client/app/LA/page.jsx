import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const precinctJSON = '/geoJSON/la/la_prec_geo_elec.geojson';

  const smdPlans = {
    0: '/geoJSON/la/smd/smd_plan_summary_0.geojson',
    1: '/geoJSON/la/smd/smd_plan_summary_10.geojson',
    2: '/geoJSON/la/smd/smd_plan_summary_119.geojson',
  };

  const mmdPlans = {
    1: '/geoJSON/la/mmd/mmd_plan_summary_10.geojson',
    2: '/geoJSON/la/mmd/mmd_plan_summary_13.geojson',
    3: '/geoJSON/la/mmd/mmd_plan_summary_560.geojson',
  }

  const smdPlanNames = {
    0: 'Enacted',
    1: 'Smallest Num. of Opportunity Districts',
    2: 'Largest Num. of Republican Safe States',
    3: 'Largest Num. of Opportunity Districts',
  }

  const mmdPlanNames = {
    1: 'Average MMD',
    2: 'Smallest Equal Population Measure',
    3: 'Biggest Number of Opportunity Representatives',
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