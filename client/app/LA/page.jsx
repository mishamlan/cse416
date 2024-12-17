import StatePage from "@/components/StatePage";

const LA = () => {
  const stateName = 'la';
  const center = [-91.602700,30.998882];
  const bound = [[-94.152325,28.374421],[-88.785689,33.415371]];
  const districtJSON = '/geoJSON/louisiana-congress.geojson';
  const precinctJSON = '/geoJSON/la/la_prec_geo_elec.geojson';

  const smdPlans = {
    'Enacted': '/geoJSON/louisiana-congress.geojson',
    'Extreme 1': '/geoJSON/louisiana-congress.geojson',
    'Extreme 2': '/geoJSON/louisiana-congress.geojson',
    'Extreme 3': '/geoJSON/louisiana-congress.geojson',
    'Extreme 4': '/geoJSON/louisiana-congress.geojson',
    'Extreme 5': '/geoJSON/louisiana-congress.geojson',
  };

  const mmdPlans = {
    mmd0: '/geoJSON/louisiana-congress.geojson',
    mmd1: '/geoJSON/louisiana-congress.geojson',
    mmd2: '/geoJSON/louisiana-congress.geojson',
    mmd3: '/geoJSON/louisiana-congress.geojson',
    mmd4: '/geoJSON/louisiana-congress.geojson',
  }

  return (
    <StatePage 
      state={stateName} 
      center={center}
      bound={bound}
      precinctData={precinctJSON}
      districtJSON={districtJSON}
      smdPlans={smdPlans}
      mmdPlans={mmdPlans}
    />
  )
}

export default LA