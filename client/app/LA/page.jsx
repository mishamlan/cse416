import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const districtJSON = '/geoJSON/louisiana-congress.geojson';
  const precinctJSON = '/geoJSON/la/la_prec_geo_elec.geojson';

  const smdEnsemble = {
    smd0: '/geoJSON/la/smd_plan_0.geojson',
    smd1: '/geoJSON/la/smd_plan_0.geojson',
    smd2: '/geoJSON/la/smd_plan_0.geojson',
    smd3: '/geoJSON/la/smd_plan_0.geojson',
    smd4: '/geoJSON/la/smd_plan_0.geojson',
  };

  const mmdEnsemble = {
    mmd0: '/geoJSON/la/smd_plan_0.geojson',
    mmd1: '/geoJSON/la/smd_plan_0.geojson',
    mmd2: '/geoJSON/la/smd_plan_0.geojson',
    mmd3: '/geoJSON/la/smd_plan_0.geojson',
    mmd4: '/geoJSON/la/smd_plan_0.geojson',
  }

  return (
    <StatePage 
      state={stateName} 
      center={center}
      bound={bound}
      precinctData={precinctJSON}
      districtJSON={districtJSON}
      smdEnsemble={smdEnsemble}
      mmdEnsemble={mmdEnsemble}
    />
  )
}

export default LA