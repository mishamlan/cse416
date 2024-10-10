import StatePage from "@/components/StatePage";

const NV = () => {
  const stateName = 'nevada';
  const center = [-116.911022,38.861699];
  const bound = [[-122.169058,34.787989],[-111.479360,42.764263]];
  const nevadaDistricts = '/geoJSON/2021Congressional_Final_SB1_Amd2.geojson';

  return (
    <div>
      <StatePage 
        stateName={stateName} 
        center={center}
        bound={bound}
        districtJSON={nevadaDistricts}
      />
    </div>
  )
}

export default NV