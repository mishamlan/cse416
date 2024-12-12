import StatePage from "@/components/StatePage";

const NV = () => {
  const stateName = 'nv';
  const center = [-116.911022, 38.861699];
  const bound = [[-121.416140,34.034490], [-111.440554,42.851839]];
  const precinctJSON = '/geoJSON/nv/';
  const districtJSON = "geoJSON/2021Congressional_Final_SB1_Amd2.geojson";

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
  );
}

export default NV;