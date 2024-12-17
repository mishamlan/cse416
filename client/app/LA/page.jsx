import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const precinctJSON = '/geoJSON/la/la_prec_geo_elec.geojson';

  const smdPlans = {
    0: '/geoJSON/la/smd_plan_summary_0.geojson',
    1: '/geoJSON/la/smd_plan_summary_0.geojson',
    2: '/geoJSON/la/smd_plan_summary_0.geojson',
    3: '/geoJSON/la/smd_plan_summary_0.geojson',
    4: '/geoJSON/la/smd_plan_summary_0.geojson',
    5: '/geoJSON/la/smd_plan_summary_0.geojson',
  };

  const mmdPlans = {
    1: '/geoJSON/la/smd_plan_summary_0.geojson',
    2: '/geoJSON/la/smd_plan_summary_0.geojson',
    3: '/geoJSON/la/smd_plan_summary_0.geojson',
    4: '/geoJSON/la/smd_plan_summary_0.geojson',
    5: '/geoJSON/la/smd_plan_summary_0.geojson',
  }

  const smdPlanNames = {
    0: 'Enacted',
    1: 'Exmtreme 1',
    2: 'Exmtreme 1',
    3: 'Exmtreme 1',
    4: 'Exmtreme 1',
    5: 'Exmtreme 1',
  }

  const mmdPlanNames = {
    1: 'Exmtreme 1',
    2: 'Exmtreme 1',
    3: 'Exmtreme 1',
    4: 'Exmtreme 1',
    5: 'Exmtreme 1',
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