import StatePage from "@/components/StatePage";

const NV = () => {
  const stateName = 'nv';
  const center = [-116.911022, 38.861699];
  const bound = [[-121.416140,34.034490], [-111.440554,42.851839]];
  const precinctJSON = '/geoJSON/nv/';
  const districtJSON = "geoJSON/2021Congressional_Final_SB1_Amd2.geojson";

  const smdPlans = {
    0: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
    1: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
    2: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
    3: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
  };

  const mmdPlans = {
    1: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
    2: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
    3: '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson',
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
      districtJSON={districtJSON}
      smdPlans={smdPlans}
      mmdPlans={mmdPlans}
      smdPlanNames={smdPlanNames}
      mmdPlanNames={mmdPlanNames}
    />
  );
}

export default NV;